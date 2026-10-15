let income = localStorage.getItem('grfs_income') ? Number(localStorage.getItem('grfs_income')) : 0;
const JARS = [
 {k:'survival', l:'SURVIVAL - Food, Transport, Rent', p:0.5, c:'#0ea5e9'},
 {k:'security', l:'SECURITY - Ajo/Savings (LOCK)', p:0.2, c:'#22c55e'},
 {k:'growth', l:'GROWTH - Skill/Business', p:0.15, c:'#f59e0b'},
 {k:'soul', l:'SOUL - Rest, Mental Health', p:0.1, c:'#8b5cf6'},
 {k:'seed', l:'SEED - Giving/Help', p:0.05, c:'#06b6d4'},
];
function render(){
 const el=document.getElementById('app');
 el.innerHTML=`
 <div style="padding:4px">
 <h1>🌱 GRFS</h1><b>Grow Rich From Small</b><p>How much entered today?</p>
 <input id="inc" type="number" placeholder="e.g 5000" value="${income||''}" />
 <button id="btn">Share My Money Wisely</button>
 ${income? `<div style="margin-top:20px">
 <h3>Your ₦${income} is shared:</h3>
 ${JARS.map(j=>`<div style="background:${j.c};color:white;padding:14px;border-radius:16px;margin:8px 0;font-weight:800;display:flex;justify-content:space-between"><span>${j.l}</span><span>₦${Math.round(income*j.p)}</span></div>`).join('')}
 <div style="background:white;padding:16px;border-radius:16px;margin-top:16px">
 <h4>⚠️ Liability Check</h4><p class="small">Before you spend, check if na NEED or WANT</p>
 <input id="spend" type="number" placeholder="Wetin you wan buy? amount" />
 <select id="type"><option value="need">NEED - brings money tomorrow</option><option value="liability">WANT - Bet, Shayo, Impulse</option></select>
 <button id="check">Check Am</button><div id="msg" style="margin-top:12px;font-weight:bold"></div>
 </div>
 <div style="background:white;padding:16px;border-radius:16px;margin-top:16px">
 <h4>💜 Emotional Check</h4><p>How you feel about money today?</p>
 <div style="display:flex;gap:8px"><button style="background:#dcfce7" onclick="mood('😊 Happy and in control')">😊</button><button style="background:#fef9c3" onclick="mood('😐 Okay, I try')">😐</button><button style="background:#fee2e2" onclick="mood('😔 Stressed about money')">😔</button></div>
 <p id="moodText" style="font-size:13px;color:#64748b;margin-top:8px">${localStorage.getItem('grfs_mood')||''}</p>
 </div>
 <p style="text-align:center;margin-top:20px;font-size:12px;color:#94a3b8">Small small dey fill basket. You are growing!</p>
 </div>`:''}
 </div>`;
 document.getElementById('btn')?.addEventListener('click',()=>{
  const v=Number(document.getElementById('inc').value); if(!v)return alert('Put amount'); income=v; localStorage.setItem('grfs_income',v); render();
 });
 document.getElementById('check')?.addEventListener('click',()=>{
  const a=Number(document.getElementById('spend').value); const t=document.getElementById('type').value; const m=document.getElementById('msg');
  if(!a)return; if(t==='liability'){m.innerHTML=`🛑 HOLD ON! If you spend ₦${a} everyday on WANT, na ₦${a*30} per month gone. That is liability. Put am for SECURITY jar. Wait 10 mins before you buy.`; m.style.color='red';} else {m.innerHTML=`✅ Good. Make sure e no pass your SURVIVAL budget ₦${Math.round(income*0.5)}. This is NEED.`; m.style.color='green';}
 });
}
window.mood=(x)=>{localStorage.setItem('grfs_mood',x); document.getElementById('moodText').innerText='Today: '+x+' - noted. Keep growing!';}
render();
