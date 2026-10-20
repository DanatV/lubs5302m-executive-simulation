"""Rebuild real RF teaching assets. Run from any directory; no runtime dependency."""
from pathlib import Path
import json, csv, hashlib
import numpy as np
import sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.inspection import permutation_importance
from sklearn.metrics import confusion_matrix, accuracy_score

ROOT = Path(__file__).resolve().parents[1]
SEED = 5302
REGIONS = {
 'asia': 'East and South East Asia',
 'africa': 'Africa',
 'europe': 'Europe and North America',
 'rest': 'Rest of the World'
}
features=['QS ranking','Annual tuition payable (£)','Social media presence (0–100)','Interactive learning (%)','Personal tutorials (hours/term)']
def forest(t,d,region):
    return RandomForestClassifier(n_estimators=t,max_depth=d,min_samples_leaf=20,max_features='sqrt',bootstrap=True,random_state=SEED if region=='asia' else 5304,n_jobs=2)

results={}
provenance={}
all_rows=[]
for ri,(region,region_label) in enumerate(REGIONS.items()):
 rng=np.random.default_rng(SEED+ri*100)
 n=12000
 ranks=np.array([42,49,55,61,66,70,74,78,82,85,88,91,94,96,98,100,101,103,106,110,114,118,124,130,138,145,155,170,185,200,220,245,270,300,340,390])
 u=rng.integers(0,len(ranks),n)
 rank=ranks[u]
 fee=np.clip(rng.normal(24500,4500,n)-rng.choice([0,2000,5000,8000],n,p=[.55,.2,.2,.05]),10000,38000).round(-2)
 social=rng.uniform(0,100,n).round(1)
 interactive=rng.uniform(10,85,n).round(1)
 tutorial=rng.uniform(.5,6,n).round(2)
 X=np.column_stack([rank,fee,social,interactive,tutorial])
 # Explicit authored regional relationships: teaching assumptions, not empirical population claims.
 if region=='asia':
  logit=-5.5+6.0*(rank<=100)+2.8*(24000-fee)/5500+2.0*(social-50)/50+.004*(interactive-40)+.02*(tutorial-2)
 else:
  # Balanced synthetic teaching signals; measured importance is never rescaled.
  qs_effect,learning_effect,tutorial_effect = (4.9,.14,1.9) if region=='africa' else (4.7,.145,2.0)
  logit=4.0*(24000-fee)/5500+qs_effect*((rank<=100)-.44)+3.0*(social-50)/50+learning_effect*(interactive-47.5)+tutorial_effect*(tutorial-3.25)
 logit=logit+rng.normal(0,.25,n)
 y=(rng.random(n)<1/(1+np.exp(-logit))).astype(int)
 dev_idx,test_idx=train_test_split(np.arange(n),test_size=2000,stratify=y,random_state=SEED)
 Xd,yd=X[dev_idx],y[dev_idx]; Xt,yt=X[test_idx],y[test_idx]
 folds=list(StratifiedKFold(5,shuffle=True,random_state=SEED).split(Xd,yd))
 sfit,saudit=train_test_split(np.arange(10000),test_size=2000,random_state=SEED+1)
 crng=np.random.default_rng(SEED+2)
 cohort=np.column_stack([np.full(8000,96),24000-crng.choice([0,2000,4000],8000,p=[.75,.2,.05]),np.full(8000,40),np.full(8000,35),np.full(8000,1.5)])
 provenance[region]={'splitHash':hashlib.sha256(dev_idx.tobytes()+test_idx.tobytes()).hexdigest(),
  'foldHash':hashlib.sha256(b''.join(a.tobytes()+b.tobytes() for a,b in folds)).hexdigest(),
  'positiveDevelopment':int(yd.sum()),'positiveTest':int(yt.sum()),'seed':SEED+ri*100}
 test_set=set(test_idx)
 for i in range(n):all_rows.append([ri*n+i+1,region,int(u[i])+1,*X[i],int(y[i]),'test' if i in test_set else 'development'])
 for trees in [10,50,100,300]:
   for depth in [2,4,6,10]:
     train_acc=[]; val_acc=[]; importance=[]
     for tr,va in folds:
       f=forest(trees,depth,region).fit(Xd[tr],yd[tr])
       train_acc.append(float(f.score(Xd[tr],yd[tr])))
       val_acc.append(float(f.score(Xd[va],yd[va])))
       imp=permutation_importance(f,Xd[va],yd[va],scoring='accuracy',n_repeats=3,random_state=SEED,n_jobs=1)
       importance.append(imp.importances)
     f=forest(trees,depth,region).fit(Xd,yd)
     test_probs=f.predict_proba(Xt)[:,1]; pred=(test_probs>=.5).astype(int)
     matrix=confusion_matrix(yt,pred,labels=[0,1]).tolist()
     fp=f.predict_proba(Xd)[:,1]
     surrogate_pred=np.zeros(len(saudit))
     def constrained(fit, audit, level=0):
       if level==3:
         value=float(fp[fit].mean())
         surrogate_pred[audit]=value
         return {'p':value,'n':int(len(fit))}
       feature=[0,1,3][level]
       if level==0:
         threshold=100.0
       else:
         stump=DecisionTreeRegressor(max_depth=1,min_samples_leaf=40,random_state=SEED).fit(Xd[fit,feature:feature+1],fp[fit])
         threshold=float(stump.tree_.threshold[0]) if stump.tree_.children_left[0]!=-1 else float(np.median(Xd[fit,feature]))
       mask=Xd[fit,feature]<=threshold
       amask=Xd[saudit[audit],feature]<=threshold
       return {'feature':feature,'threshold':threshold,'n':int(len(fit)),
         'left':constrained(fit[mask],audit[amask],level+1),
         'right':constrained(fit[~mask],audit[~amask],level+1)}
     summary=constrained(sfit,np.arange(len(saudit)))
     im=np.concatenate(importance,axis=1)
     results[f'{region}:{trees}-{depth}']={
       'region':region,'regionLabel':region_label,'trees':trees,'depth':depth,'cohortProbability':float(f.predict_proba(cohort)[:,1].mean()),
       'folds':val_acc,'trainingFolds':train_acc,'cvMean':float(np.mean(val_acc)),'cvStd':float(np.std(val_acc)),
       'trainMean':float(np.mean(train_acc)),'importanceMean':im.mean(axis=1).tolist(),'importanceStd':im.std(axis=1).tolist(),
       'importanceSamples':im.tolist(),'matrix':matrix,'baseline':float(max(np.mean(yt),1-np.mean(yt))),
       'summary':summary,
       'agreement':float(np.mean((surrogate_pred>=.5)==(fp[saudit]>=.5))),
       'surrogateMAE':float(np.mean(abs(surrogate_pred-fp[saudit])))}
     print(f'{region} {trees}-{depth}: CV {np.mean(val_acc):.3f}, test {accuracy_score(yt,pred):.3f}',flush=True)
 

# Verify the designed teaching patterns on computed importance, never relabel or edit measured scores.
for key,m in results.items():
 order=np.argsort(-np.array(m['importanceMean'])).tolist()
 expected=(order[0]==0 and order[2]==2) if m['region']=='asia' else (order[0]==1 and set(order[1:3])=={3,4} and order[3:]==[0,2] and min(m['importanceMean'])>0)
 if not expected: raise RuntimeError(f'Regional teaching pattern not achieved: {key}, order={order}')
meta={'seed':SEED,'version':'2.1.0','sklearn':sklearn.__version__,'numpy':np.__version__,'features':features,
 'developmentSize':10000,'testSize':2000,'recordsPerRegion':12000,'totalRecords':48000,'regions':REGIONS,'provenance':provenance,'cohortSize':8000}
(ROOT/'js/results.js').write_text('/* Generated by dev/generate.py. Do not hand-edit model results. */\nwindow.MODEL_DATA = '+json.dumps({'meta':meta,'models':results},separators=(',',':'))+';\n')
with (ROOT/'dev/synthetic-recruitment.csv').open('w',newline='') as out:
 w=csv.writer(out);w.writerow(['record_id','origin_region','fictional_university_id',*features,'Enrolled','split']);w.writerows(all_rows)
(ROOT/'dev/provenance.json').write_text(json.dumps(meta,indent=2))
print('Wrote 64 regional configurations and 48,000 synthetic records.',flush=True)
