(() => {
  'use strict';
  const KEY='lubs5302m-executive-v2.1';
  let state=Core.fresh(),storageOK=true,pendingSaved=null,returnFocus=null;
  const main=document.getElementById('main'),dialog=document.getElementById('dialog');
  const $=id=>document.getElementById(id),esc=Views.e;
  function announce(message){$('announcer').textContent=message;}
  function error(err){const el=$('error');el.hidden=false;el.replaceChildren(document.createTextNode(err.message||String(err)));const close=document.createElement('button');close.textContent='Dismiss';close.onclick=()=>{el.hidden=true;};el.append(' ',close);}
  function storageStatus(){ $('save-status').textContent=storageOK?'Saved automatically in this browser':'Browser storage unavailable. Progress will not persist after closing. Save session JSON to keep your work.';$('save-status').classList.toggle('warning',!storageOK); }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{storageOK=false;}storageStatus();}
  function render(focus=false){
    const labels=['Executive briefing','Evidence and investment','Interim results and adjustment','Final board report'];
    $('stages').innerHTML=labels.map((label,i)=>`<button data-stage="${i+1}" ${i+1===state.stage?'aria-current="step"':''} ${i+1>Core.maxStage(state)?'disabled':''}><span>${i+1}</span>${label}</button>`).join('');
    $('team-status').textContent=state.team?`Team ${state.team} · ${state.second?'Both decisions submitted':state.first?'First decision submitted':'In progress'}`:'Your team’s executive workspace';
    main.innerHTML=Views.render(state);storageStatus();
    if(focus){main.focus();main.scrollIntoView({block:'start'});}
    fitTrees();
  }
  function preserveRender(selector){
    const openDetails=[...main.querySelectorAll('details')].map((d,i)=>d.open?i:null).filter(x=>x!==null);
    const y=window.scrollY;render();openDetails.forEach(i=>{const d=main.querySelectorAll('details')[i];if(d)d.open=true;});
    if(selector){const target=main.querySelector(selector);if(target)target.focus({preventScroll:true});}window.scrollTo(0,y);
  }
  function fitTrees(){main.querySelectorAll('.tree-viewport').forEach(view=>{const svg=view.querySelector('svg');if(svg){const w=Number(svg.dataset.treeWidth),scale=Math.min(1,Math.max(.3,(view.clientWidth||900)/w));svg.style.width=w*scale+'px';svg.style.height=590*scale+'px';svg.dataset.scale=scale;}});}
  function navigate(stage){if(stage<1||stage>Core.maxStage(state))throw Error('Complete the preceding decision to unlock this stage.');state.stage=stage;save();render(true);}
  function modal(title,body,buttons){
    returnFocus=document.activeElement;dialog.innerHTML=`<h2 id="dialog-title">${esc(title)}</h2>${body}<div class="actions">${buttons.map((b,i)=>`<button data-dialog-index="${i}" class="${b.primary?'primary':''}">${esc(b.label)}</button>`).join('')}</div>`;
    dialog.querySelectorAll('button').forEach((el,i)=>el.addEventListener('click',()=>{closeDialog();try{buttons[i].action?.();}catch(err){error(err);}}));dialog.showModal();
  }
  function closeDialog(){dialog.close();if(returnFocus?.isConnected)returnFocus.focus();}
  dialog.addEventListener('keydown',ev=>{
    if(ev.key!=='Tab')return;
    const controls=[...dialog.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href]')];
    if(!controls.length)return;
    const first=controls[0],last=controls[controls.length-1];
    if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
    else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
  });
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
  function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);announce('Download prepared.');}
  function sessionExport(){const payload={...Core.clone(state),outcomes:Core.outcomes(state)};download(`northbridge-team-${state.team||'draft'}-session.json`,JSON.stringify(payload,null,2),'application/json');}
  const reportCSS='body{font:18px/1.55 Arial,sans-serif;color:#302723;margin:30px auto;max-width:1150px;padding:0 20px}h2,h3{color:#842719}table{border-collapse:collapse;width:100%;margin:20px 0;font-size:16px}th,td{text-align:left;border-bottom:1px solid #d7c9c1;padding:10px}th{background:#fcf8f5}svg{max-width:100%;height:auto;display:block}.chart{max-width:800px}.tree-svg{width:100%;height:auto}.tree-viewport{overflow:visible}.hint,.print-stamp{color:#685951;font-size:15px}.report-section{margin:28px 0}.report-text{white-space:pre-wrap;overflow-wrap:anywhere}.metric-strip{display:flex;flex-wrap:wrap;gap:25px}.metric-strip strong,.metric-strip span{display:block}.budget-bar{display:none}.tree-outline{font-size:15px}.tree-controls{display:none}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}@media print{body{font-size:11pt;margin:0}h2,h3,h4{break-after:avoid}svg,tr,table{break-inside:avoid}table{font-size:10pt}@page{size:A4;margin:15mm}}';
  function htmlExport(){if(!state.second)throw Error('Complete both decisions before exporting the board report.');download(`northbridge-team-${state.team}-board-report.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Team ${state.team} — Northbridge board report</title><style>${reportCSS}</style></head><body>${Views.report(state)}<p>Submit exported reports through Minerva or via email: <a href="mailto:d.valizade@leeds.ac.uk">d.valizade@leeds.ac.uk</a>. All scenario outcomes are fictional.</p></body></html>`,'text/html');}
  function reset(){modal(state.second?'Start a separate replay?':'Start a new simulation?',`<p>This replaces the session in this browser. Download the current session first to preserve it.</p>`,[{label:'Cancel'},{label:'Download current session',action:()=>sessionExport()},{label:'Replace and start new',primary:true,action:()=>{state=Core.fresh();save();render(true);}}]);}
  function act(name){
    if(name==='compare'){if(!state.comparisons.includes(state.model)&&state.comparisons.length<3)state.comparisons.push(state.model);save();preserveRender('[data-action="compare"]');announce('Configuration saved for comparison.');}
    if(name==='first'){
      if(state.first)throw Error('This decision is already submitted.');const p=SIM.packages[state.draftPackage];if(!p)throw Error('Select a permitted package.');
      modal('Commit your first decision?',`<p>Team ${state.team} · Package ${state.draftPackage}: <strong>${p.name}</strong>.</p>${Views.allocation(p)}<p>The ${MODEL_DATA.models[state.model].regionLabel} · ${MODEL_DATA.models[state.model].trees}-tree, depth-${MODEL_DATA.models[state.model].depth} evidence and your notes will be recorded. You can inspect evidence later, but this allocation will be locked.</p>`,[{label:'Keep editing'},{label:'Confirm first decision',primary:true,action:()=>{Core.submitFirst(state);save();render(true);}}]);
    }
    if(name==='second'){
      if(state.second)throw Error('This adjustment is already submitted.');const f=SIM.followups[state.draftFollowup];if(!f||f.id[0]!==state.first?.package)throw Error('Select a permitted adjustment.');
      modal('Commit your £500,000 adjustment?',`<p>${esc(f.name)}.</p><p>The original £5 million remains committed. Total strategic expenditure will be £5.5 million.</p>`,[{label:'Keep editing'},{label:'Confirm second decision',primary:true,action:()=>{Core.submitSecond(state);save();render(true);}}]);
    }
    if(name==='json')sessionExport();if(name==='html')htmlExport();if(name==='replay')reset();
    if(name==='print'){if(!state.second)throw Error('Complete both decisions first.');$('print-view').innerHTML=Views.report(state);window.print();}
  }
  document.addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b||b.disabled)return;try{
    if(b.dataset.stage)navigate(Number(b.dataset.stage));
    if(b.dataset.action)act(b.dataset.action);
    if(b.dataset.package){if(state.first)throw Error('The first decision is locked.');state.draftPackage=b.dataset.package;save();preserveRender(`[data-package="${b.dataset.package}"]`);announce(`Package ${b.dataset.package} selected.`);}
    if(b.dataset.followup){if(state.second)throw Error('The second decision is locked.');if(!state.first||b.dataset.followup[0]!==state.first.package)throw Error('This adjustment is not allowed.');state.draftFollowup=b.dataset.followup;save();preserveRender(`[data-followup="${b.dataset.followup}"]`);announce(`Adjustment ${b.dataset.followup} selected.`);}
    if(b.dataset.removeModel){state.comparisons=state.comparisons.filter(k=>k!==b.dataset.removeModel);save();preserveRender('[data-action="compare"]');}
    if(b.dataset.tree){const section=b.closest('section,details'),view=section.querySelector('.tree-viewport'),svg=view.querySelector('svg'),w=Number(svg.dataset.treeWidth);let scale=Number(svg.dataset.scale)||1;scale=b.dataset.tree==='fit'?Math.min(1,Math.max(.3,view.clientWidth/w)):Math.min(2,Math.max(.3,scale*(b.dataset.tree==='in'?1.25:.8)));svg.dataset.scale=scale;svg.style.width=w*scale+'px';svg.style.height=590*scale+'px';}
  }catch(err){error(err);}});
  main.addEventListener('submit',ev=>{if(ev.target.id==='team-form'){ev.preventDefault();try{if(state.first)navigate(2);else{Core.setTeam(state,$('team-number').value);save();render(true);}}catch(err){error(err);}}});
  main.addEventListener('change',ev=>{if(['region','trees','depth'].includes(ev.target.id)){const id=ev.target.id;state.model=$('region').value+':'+$('trees').value+'-'+$('depth').value;save();preserveRender('#'+id);announce('All model outputs updated.');}});
  main.addEventListener('input',ev=>{const t=ev.target;if(t.dataset.note&&!state.first){state.notes[t.dataset.note]=t.value;save();}if(t.dataset.reflection!==undefined){state.reflections[Number(t.dataset.reflection)]=t.value;save();}});
  $('export-json').onclick=sessionExport;$('reset').onclick=reset;$('import-json').onclick=()=>$('import-file').click();
  $('import-file').addEventListener('change',async ev=>{const file=ev.target.files[0];if(!file)return;try{if(file.size>2000000)throw Error('Choose a session JSON smaller than 2 MB.');const clean=Core.validate(JSON.parse(await file.text()));modal('Replace this browser session?',`<p>Import team ${clean.team||'not yet assigned'}, stage ${clean.stage}. Model evidence and outcomes will be reconciled with simulation ${SIM.version}.</p><p>Download your current session before replacing it if you need to keep it.</p>`,[{label:'Cancel'},{label:'Download current session',action:sessionExport},{label:'Replace with imported session',primary:true,action:()=>{state=clean;save();render(true);}}]);}catch(err){error(new Error('Import failed: '+err.message));}finally{ev.target.value='';}});
  window.addEventListener('beforeprint',()=>{if(state.second)$('print-view').innerHTML=Views.report(state);});
  try{const raw=localStorage.getItem(KEY);if(raw){try{pendingSaved=Core.validate(JSON.parse(raw));}catch{error(new Error('Saved work could not be restored because it is invalid or from another version. Import a compatible backup or start a new session.'));}}localStorage.setItem(KEY+'-probe','1');localStorage.removeItem(KEY+'-probe');}catch{storageOK=false;}
  if(pendingSaved)state=pendingSaved; // Escape from the restore dialog must not expose a blank replacement session.
  render();
  if(pendingSaved)modal('Continue your previous simulation?',`<p>Team ${pendingSaved.team||'not yet assigned'} · ${pendingSaved.second?'completed report':`stage ${pendingSaved.stage}`}.</p><p>Start a new simulation will replace the saved session.</p>`,[{label:'Continue',primary:true,action:()=>{state=pendingSaved;save();render(true);}},{label:'Start a new simulation',action:reset}]);
})();
