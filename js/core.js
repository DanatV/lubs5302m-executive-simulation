/* Pure state and decision logic. No browser storage or DOM dependencies. */
window.Core = (() => {
  const clone = x => JSON.parse(JSON.stringify(x));
  const own = (o,k) => Object.prototype.hasOwnProperty.call(o,k);
  const model = k => typeof k === 'string' && own(MODEL_DATA.models,k);
  const pack = k => typeof k === 'string' && own(SIM.packages,k);
  const follow = (p,k) => typeof k === 'string' && own(SIM.followups,k) && k[0]===p;
  const timestamp = () => new Date().toISOString();
  function fresh(){ return {version:SIM.version,team:null,stage:1,model:'europe:100-4',comparisons:[],draftPackage:null,draftFollowup:null,notes:{reason:'',evidence:'',concern:''},reflections:[''],first:null,second:null,created:timestamp()}; }
  function maxStage(s){return s.second?4:s.first?3:s.team?2:1;}
  function setTeam(s,value){
    if(s.first) throw Error('The submitted team number is locked. Start a separate replay to change it.');
    if(!/^\d{1,3}$/.test(String(value)) || Number(value)<1 || Number(value)>999) throw Error('Enter a whole team number from 1 to 999.');
    s.team=Number(value);s.stage=2;
  }
  function submitFirst(s){
    if(s.first) throw Error('The first decision has already been submitted.');
    if(!Number.isInteger(s.team)||s.team<1||s.team>999) throw Error('Enter your team number first.');
    if(!pack(s.draftPackage)) throw Error('Select one of the four permitted investment packages.');
    if(!model(s.model)) throw Error('Select a valid model configuration.');
    s.first={package:s.draftPackage,model:s.model,evidence:clone(MODEL_DATA.models[s.model]),notes:clone(s.notes),at:timestamp()};
    s.stage=3;
  }
  function submitSecond(s){
    if(!s.first) throw Error('Submit the first decision before choosing an adjustment.');
    if(s.second) throw Error('The second decision has already been submitted.');
    if(!follow(s.first.package,s.draftFollowup)) throw Error('Select an adjustment allowed for your original package.');
    s.second={id:s.draftFollowup,at:timestamp()};s.stage=4;
  }
  function outcomes(s){return {baseline:clone(SIM.baseline),interim:s.first?clone(SIM.packages[s.first.package].interim):null,final:s.second?clone(SIM.followups[s.second.id].outcome):null,total:s.second?5500000:s.first?5000000:0};}
  function evidenceMetrics(m){const [[tn,fp],[fn,tp]]=m.matrix;const n=tn+fp+fn+tp;return {accuracy:(tn+tp)/n,precision:tp+fp?tp/(tp+fp):null,recall:tp+fn?tp/(tp+fn):null,n};}
  function validate(raw){
    const fail = msg=>{throw Error(msg);};
    if(!raw||typeof raw!=='object'||Array.isArray(raw)) fail('The imported file must contain a session object.');
    if(raw.version!==SIM.version) fail('This session version is unsupported. Use the matching application version.');
    const s=fresh();
    const text=(x,label)=> typeof x==='string' && x.length<=6000?x:fail(`${label} must be text of at most 6,000 characters.`);
    const date=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT/.test(x)&&Number.isFinite(Date.parse(x))?x:fail('A session timestamp is invalid.');
    const notes=n=>{if(!n||typeof n!=='object')fail('Decision notes are missing.');return Object.fromEntries(['reason','evidence','concern'].map(k=>[k,text(n[k],'Decision note')]));};
    if(raw.team!==null&&(!Number.isInteger(raw.team)||raw.team<1||raw.team>999))fail('Team number must be an integer from 1 to 999.');
    s.team=raw.team;
    if(!model(raw.model))fail('Unknown model configuration.');s.model=raw.model;
    if(!Array.isArray(raw.comparisons)||raw.comparisons.length>3||new Set(raw.comparisons).size!==raw.comparisons.length||raw.comparisons.some(k=>!model(k)))fail('Model comparisons must contain up to three distinct valid configurations.');
    s.comparisons=[...raw.comparisons];
    if(raw.draftPackage!==null&&!pack(raw.draftPackage))fail('Unrecognised investment package.');s.draftPackage=raw.draftPackage;
    s.notes=notes(raw.notes);
    if(!Array.isArray(raw.reflections)||raw.reflections.length!==1)fail('The session must contain one optional response field.');s.reflections=raw.reflections.map(x=>text(x,'Reflection'));
    s.created=date(raw.created);
    if(raw.first!==null){
      const f=raw.first;
      if(!f||!s.team||!pack(f.package)||!model(f.model))fail('The first submitted decision is invalid.');
      s.first={package:f.package,model:f.model,evidence:clone(MODEL_DATA.models[f.model]),notes:notes(f.notes),at:date(f.at)};
      // Canonical evidence and outcomes replace any untrusted imported derived data.
      s.draftPackage=f.package;
    }
    if(raw.draftFollowup!==null&&(!s.first||!follow(s.first.package,raw.draftFollowup)))fail('The adjustment is incompatible with the first package.');s.draftFollowup=raw.draftFollowup;
    if(raw.second!==null){
      if(!raw.second||!s.first||!follow(s.first.package,raw.second.id))fail('The second submitted decision is invalid.');
      s.second={id:raw.second.id,at:date(raw.second.at)};s.draftFollowup=s.second.id;
    }
    if(!Number.isInteger(raw.stage)||raw.stage<1||raw.stage>maxStage(s))fail('This stage is not unlocked by the recorded decisions.');s.stage=raw.stage;
    return s;
  }
  return {fresh,setTeam,submitFirst,submitSecond,maxStage,outcomes,evidenceMetrics,validate,clone};
})();
