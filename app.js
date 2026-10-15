// GRFS CORE LOGIC
const JARS = {
  survival: { label: "SURVIVAL (Food, Transport)", pct: 0.5, color: "#0ea5e9" },
  security: { label: "SECURITY (Ajo/Savings)", pct: 0.2, color: "#22c55e" },
  growth: { label: "GROWTH (Skill/Business)", pct: 0.15, color: "#f59e0b" },
  soul: { label: "SOUL (Emotional Rest)", pct: 0.10, color: "#8b5cf6" },
  seed: { label: "SEED (Giving)", pct: 0.05, color: "#06b6d4" }
}

let dailyIncome = localStorage.getItem('grfs_income') || 0
let history = JSON.parse(localStorage.getItem('grfs_history')||'[]')

function render(){
  const root = document.getElementById('root')
  const income = Number(dailyIncome)
  root.innerHTML = `
    <h2>🌱 GRFS</h2><p><b>Grow Rich From Small</b></p>
    <p>How much entered today?</p>
    <input id="incomeInput" type="number" placeholder="e.g 5000" value="${income||''}" />
    <button onclick="saveIncome()">Share My Money Wisely</button>
    
    ${income ? `
      <h3>Your ₦${income} shared:</h3>
      ${Object.entries(JARS).map(([k,v])=>{
        const amt = Math.round(income*v.pct)
        return `<div class="jar" style="background:${v.color}">${v.label}<br/>₦${amt} (${v.pct*100}%)</div>`
      }).join('')}
      
      <h3>⚠️ Spend Check</h3>
      <input id="spendInput" type="number" placeholder="You want spend how much?" />
      <select id="spendType" style="width:100%;padding:12px;margin-top:8px;border-radius:12px">
        <option value="need">NEED - Will help me tomorrow</option>
        <option value="liability">WANT - Shayo, Bet, Impulse</option>
      </select>
      <button onclick="checkSpend()">Check Before Spending</button>
      <div id="advice" style="margin-top:12px;font-weight:bold"></div>

      <h3>💜 How you feel today?</h3>
      <button onclick="saveMood('😊 Happy')" style="background:#dcfce7;color:#166534">😊 Happy</button>
      <button onclick="saveMood('😐 Okay')" style="background:#fef9c3;color:#854d0e">😐 Okay</button>
      <button onclick="saveMood('😔 Stressed')" style="background:#fee2e2;color:#991b1b">😔 Stressed</button>
      
      <p style="margin-top:20px">Saved this week: ₦${history.reduce((a,b)=>a+b.amount,0)}</p>
    ` : ''}
  `
}

window.saveIncome = ()=>{
  const v = document.getElementById('incomeInput').value
  if(!v) return alert('Put how much entered today')
  dailyIncome=v
  localStorage.setItem('grfs_income',v)
  history.push({amount:Math.round(v*0.2), date:new Date().toLocaleDateString()})
  localStorage.setItem('grfs_history',JSON.stringify(history))
  render()
}

window.checkSpend = ()=>{
  const amt = Number(document.getElementById('spendInput').value)
  const type = document.getElementById('spendType').value
  const advice = document.getElementById('advice')
  if(type==='liability'){
    advice.innerHTML = `🛑 WAIT 10 MINS! <br/> If you spend ₦${amt} daily on liability, na ₦${amt*30} for month! That money fit start pure water business. <br/><br/> Ask: Will this bring money tomorrow? If NO, put am for SECURITY jar.`
    advice.style.color='red'
  } else {
    advice.innerHTML = `✅ Good spend. Make sure e dey inside SURVIVAL budget (max ₦${Math.round(dailyIncome*0.5)} today)`
    advice.style.color='green'
  }
}

window.saveMood = (m)=>{
  localStorage.setItem('grfs_mood',m)
  alert(`Noted: ${m}. Remember, small small na im dey fill basket. You go grow!`)
}

render()
