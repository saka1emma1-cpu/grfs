function safeParse(k,f){try{var v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}}
var income=Number(localStorage.getItem('grfs_income')||0);
var myHistory=safeParse('grfs_history',[]);
var totalSecurity=Number(localStorage.getItem('grfs_total_security')||0);
var targetGoal=Number(localStorage.getItem('grfs_target')||1000000);
var jarPerc=safeParse('grfs_perc',[50,20,15,10,5]);
if(!Array.isArray(jarPerc)||jarPerc.length!=5) jarPerc=[50,20,15,10,5];
var savedFont=localStorage.getItem('grfs_font')||'16px';
var savedBg=localStorage.getItem('grfs_bg')||'#f1f5f9';
function applySettings(){document.documentElement.style.setProperty('--bg',savedBg);document.documentElement.style.setProperty('--fs',savedFont)}
applySettings();
function openSettings(){
document.getElementById('setTotal').value=totalSecurity;
document.getElementById('setTarget').value=targetGoal;
document.getElementById('p1').value=jarPerc[0];document.getElementById('p2').value=jarPerc[1];
document.getElementById('p3').value=jarPerc[2];document.getElementById('p4').value=jarPerc[3];document.getElementById('p5').value=jarPerc[4];
document.getElementById('setFont').value=savedFont;
document.getElementById('settingsOverlay').style.display='block';
}
function closeSettings(){document.getElementById('settingsOverlay').style.display='none';render()}
function changeFont(){var v=document.getElementById('setFont').value;savedFont=v;localStorage.setItem('grfs_font',v);document.documentElement.style.setProperty('--fs',v)}
function changeBg(c,el){savedBg=c;localStorage.setItem('grfs_bg',c);document.documentElement.style.setProperty('--bg',c);if(el){document.querySelectorAll('.color-dot').forEach(d=>d.classList.remove('active'));el.classList.add('active')}}
function updateTotal(){var v=Number(document.getElementById('setTotal').value);if(isNaN(v))return alert('Put number');totalSecurity=v;localStorage.setItem('grfs_total_security',v);alert('Fixed to ₦'+v);closeSettings()}
function changeTargetS(){var t=Number(document.getElementById('setTarget').value);targetGoal=t;localStorage.setItem('grfs_target',t)}
function savePerc(){var a=[+p1.value,+p2.value,+p3.value,+p4.value,+p5.value];var s=a.reduce((x,y)=>x+y,0);if(s!=100)return alert('Must be 100% now '+s+'%');jarPerc=a;localStorage.setItem('grfs_perc',JSON.stringify(a));alert('Saved '+a.join('/'));closeSettings()}
function resetPerc(){jarPerc=[50,20,15,10,5];localStorage.setItem('grfs_perc',JSON.stringify(jarPerc));alert('Reset');closeSettings()}
function resetSec(){if(confirm('Reset SECURITY to 0?')){totalSecurity=0;localStorage.setItem('grfs_total_security',0);closeSettings()}}
function clearAll(){if(confirm('Clear all?')){localStorage.clear();location.reload()}}
function exportData(){var t='GRFS Story\nSECURITY: ₦'+totalSecurity+'\nTarget: ₦'+targetGoal+'\nJars:'+jarPerc.join('/')+'\n\n';myHistory.forEach(h=>{t+=h.date+' - '+h.item+' - ₦'+h.amount+' - '+h.type+'\n'});navigator.clipboard.writeText(t).then(()=>alert('Copied!')).catch(()=>prompt('Copy:',t))}
function shareApp(){if(navigator.share)navigator.share({title:'GRFS',text:'Grow Rich From Small',url:location.href});else prompt('Link:',location.href)}
function render(){
try{
var app=document.getElementById('app');
var h='<h1 style="margin:0">🌱 GRFS</h1><b>Grow Rich From Small</b><p class="small">Tap ⚙️ to change Font & Background</p>';
h+='<div class="card info"><h3>📖 How GRFS Works</h3><details open><summary>💰 5 Jars</summary><ul><li>SURVIVAL '+jarPerc[0]+'%</li><li>SECURITY '+jarPerc[1]+'% Ajo future</li><li>GROWTH '+jarPerc[2]+'%</li><li>SOUL '+jarPerc[3]+'%</li><li>SEED '+jarPerc[4]+'%</li></ul></details><details open><summary>💜 Emotional</summary><ul><li>NEED=Must</li><li>WANT=Wait 24hrs</li></ul></details><details open><summary>🔒 Honesty</summary><p class="small">GRFS no be bank, na mirror. Data on your phone.</p></details></div>';
h+='<p class="small" style="margin-top:14px">How much entered today?</p><input id="inc" type="number" placeholder="e.g 6000" value="'+(income||'')+'"><div class="honest-box"><input id="honest" type="checkbox" checked><label class="small">I promise to be honest</label></div><button onclick="saveIncome()">Share My Money Wisely</button>';
if(income>0||totalSecurity>0){
var sec=Math.round(income*jarPerc[1]/100);
if(income>0){
h+='<h3>Your ₦'+income+' shared:</h3>';
h+='<div class="jar" style="background:#0ea5e9"><span>SURVIVAL '+jarPerc[0]+'%</span><span>₦'+Math.round(income*jarPerc[0]/100)+'</span></div>';
h+='<div class="jar" style="background:#22c55e"><span>SECURITY '+jarPerc[1]+'%</span><span>₦'+sec+'</span></div>';
h+='<div class="jar" style="background:#f59e0b"><span>GROWTH '+jarPerc[2]+'%</span><span>₦'+Math.round(income*jarPerc[2]/100)+'</span></div>';
h+='<div class="jar" style="background:#8b5cf6"><span>SOUL '+jarPerc[3]+'%</span><span>₦'+Math.round(income*jarPerc[3]/100)+'</span></div>';
h+='<div class="jar" style="background:#06b6d4"><span>SEED '+jarPerc[4]+'%</span><span>₦'+Math.round(income*jarPerc[4]/100)+'</span></div>';
}
h+='<div class="milestone"><h3 style="margin:0">🚀 Road to Riches</h3><select id="target" class="target-select" onchange="changeTarget()"><option value="1000000" '+(targetGoal==1000000?'selected':'')+'>₦1M</option><option value="2000000" '+(targetGoal==2000000?'selected':'')+'>₦2M</option><option value="5000000" '+(targetGoal==5000000?'selected':'')+'>₦5M</option><option value="10000000" '+(targetGoal==10000000?'selected':'')+'>₦10M</option><option value="20000000" '+(targetGoal==20000000?'selected':'')+'>₦20M</option><option value="50000000" '+(targetGoal==50000000?'selected':'')+'>₦50M</option></select>';
var pct=Math.min(totalSecurity/targetGoal*100,100).toFixed(1);
var remain=targetGoal-totalSecurity;if(remain<0)remain=0;
var days=sec>0?Math.ceil(remain/sec):0;
h+='<p class="small" style="color:#94a3b8">Total: <b style="color:#22c55e">₦'+totalSecurity+'</b> Remain ₦'+remain+'</p><div class="progress"><div class="progress-fill" style="width:'+pct+'%"></div></div><p class="small" style="color:#cbd5e1">'+pct+'% to ₦'+(targetGoal/1000000)+'M '+(days>0?'- In '+days+'d':'')+'</p>';
h+='<div style="margin-top:12px;border-top:1px solid #334155;padding-top:10px"><p class="small" style="color:#fbbf24">💰 SECURITY Wallet</p><div class="sec-box"><input id="secAmount" type="number" placeholder="500"><button class="sec-btn" onclick="spendSecurity()" style="background:#ef4444">Use</button><button class="sec-btn" onclick="repaySecurity()" style="background:#22c55e">Pay Back</button></div></div></div>';
h+='<div class="card"><h4>⚠️ Spend Check</h4><input id="spendItem" type="text" placeholder="Wetin you wan buy?"><input id="spend" type="number" placeholder="How much?"><select id="type"><option value="need">NEED</option><option value="liability">WANT</option></select><button onclick="checkSpend()">Check Am</button><div id="msg" style="margin-top:8px;font-weight:bold"></div></div>';
h+='<div class="card"><h4>📜 Your Money Story</h4>';
if(myHistory.length==0)h+='<p class="small">No history yet.</p>';
else{for(var i=0;i<myHistory.length;i++){var hi=myHistory[i];var bc=hi.type=='need'?'need':hi.type=='want'?'want':hi.type=='security'?'sec':'repay';h+='<div class="hist-item"><div><b>'+hi.item+'</b> - ₦'+hi.amount+' <span class="badge '+bc+'">'+hi.type+'</span><br><span class="small">'+hi.date+'</span></div><div onclick="delHist('+i+')" style="color:#ef4444;font-weight:900;padding:6px">✕</div></div>'}h+='<button onclick="clearHist()" style="background:#fee2e2;color:#991b1b">Clear History</button>'}
h+='</div>';
}
app.innerHTML=h;
}catch(e){document.getElementById('app').innerHTML='<div class="card"><h3>Error: '+e.message+'</h3><button onclick="localStorage.clear();location.reload()">Reset</button></div>'}
}
function saveIncome(){var v=document.getElementById('inc').value;if(!v)return alert('Put amount');if(!document.getElementById('honest').checked)return alert('Check honesty');var ni=Number(v);var ns=Math.round(ni*jarPerc[1]/100);income=ni;totalSecurity=Number(localStorage.getItem('grfs_total_security')||0)+ns;localStorage.setItem('grfs_income',v);localStorage.setItem('grfs_total_security',totalSecurity);render()}
function changeTarget(){var t=Number(document.getElementById('target').value);targetGoal=t;localStorage.setItem('grfs_target',t);render()}
function spendSecurity(){var v=Number(document.getElementById('secAmount').value);if(!v)return alert('Put amount');if(v>totalSecurity)return alert('You get ₦'+totalSecurity);var r=prompt('Why use?');if(r===null)return;if(!confirm('Use ₦'+v+'? Remain ₦'+(totalSecurity-v)))return;totalSecurity-=v;localStorage.setItem('grfs_total_security',totalSecurity);myHistory.unshift({item:r||'Used SECURITY',amount:v,type:'security',date:new Date().toLocaleString()});localStorage.setItem('grfs_history',JSON.stringify(myHistory));render()}
function repaySecurity(){var v=Number(document.getElementById('secAmount').value);if(!v)return alert('Put amount');var r=prompt('From where?');if(r===null)return;totalSecurity+=v;localStorage.setItem('grfs_total_security',totalSecurity);myHistory.unshift({item:r||'Paid back',amount:v,type:'repay',date:new Date().toLocaleString()});localStorage.setItem('grfs_history',JSON.stringify(myHistory));render()}
function checkSpend(){var item=document.getElementById('spendItem').value.trim()||'That thing';var a=Number(document.getElementById('spend').value);var t=document.getElementById('type').value;if(!a)return document.getElementById('msg').innerHTML='Put amount!';myHistory.unshift({item:item,amount:a,type:t=='liability'?'want':'need',date:new Date().toLocaleString()});localStorage.setItem('grfs_history',JSON.stringify(myHistory));document.getElementById('msg').innerHTML=t=='liability'?'🛑 WANT Wait 24hrs!':'✅ NEED';setTimeout(render,1000)}
function delHist(i){var h=myHistory[i];if(h.type=='security'){if(confirm('Return ₦'+h.amount+'?')){totalSecurity+=h.amount;localStorage.setItem('grfs_total_security',totalSecurity)}}else if(h.type=='repay'){if(confirm('Remove pay back?')){totalSecurity-=h.amount;if(totalSecurity<0)totalSecurity=0;localStorage.setItem('grfs_total_security',totalSecurity)}}myHistory.splice(i,1);localStorage.setItem('grfs_history',JSON.stringify(myHistory));render()}
function clearHist(){if(confirm('Clear history?')){myHistory=[];localStorage.setItem('grfs_history','[]');render()}}
render();
