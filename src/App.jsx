import { useState } from "react";

const PEOPLE = {
  Pooja:    { c: "#036CA1", bg: "#E1EFF8", t: "#02283A" },
  Mandi:    { c: "#0E87C3", bg: "#E1F3FB", t: "#02283A" },
  Ishana:   { c: "#3B5781", bg: "#E8EDF5", t: "#02283A" },
  Nouaama:  { c: "#FB7F38", bg: "#FEF0E8", t: "#7A3A10" },
  Shivaun:  { c: "#034F76", bg: "#E0EBF3", t: "#02283A" },
  Francois: { c: "#6B8BBC", bg: "#EDF1F8", t: "#2C3E5A" },
  Mukundan: { c: "#31B0F1", bg: "#E5F6FE", t: "#034F76" },
  Becca:    { c: "#02283A", bg: "#E0E5E8", t: "#02283A" },
  Alyssa:   { c: "#3B5781", bg: "#E8EDF5", t: "#2C3E5A" },
  All:      { c: "#6B8BBC", bg: "#EDF1F8", t: "#3B5781" },
};

const CAT_STYLES = {
  Email:        { bg: "#E1EFF8", co: "#02283A", b: "#036CA1" },
  LinkedIn:     { bg: "#E1F3FB", co: "#034F76", b: "#0E87C3" },
  Platform:     { bg: "#E8EDF5", co: "#2C3E5A", b: "#3B5781" },
  Content:      { bg: "#FEF0E8", co: "#7A3A10", b: "#FB7F38" },
  "Live event": { bg: "#E5F6FE", co: "#034F76", b: "#31B0F1" },
  Operations:   { bg: "#EDF1F8", co: "#2C3E5A", b: "#6B8BBC" },
  Sales:        { bg: "#E0EBF3", co: "#02283A", b: "#034F76" },
};

const RACI_STYLES = {
  R: { bg: "#E1EFF8", co: "#02283A" },
  A: { bg: "#FEF0E8", co: "#7A3A10" },
  C: { bg: "#E5F6FE", co: "#034F76" },
  I: { bg: "#EDF1F8", co: "#3B5781" },
};

const WEEK_LABELS = {
  W1: "Week 1 · 20–27 May",
  W2: "Week 2 · 28 May–6 Jun",
  W3: "Week 3 · 7–10 Jun · Event day",
  W4: "Week 4 · Post-event",
};

const TASKS = [
  { id:"a", w:"W1", d:"Wed 20 May", l:"T−21", ti:"First HubSpot email (W1 audience + master list)", c:"Email", R:["Mandi"], A:["Pooja"], C:[], I:["Ishana"] },
  { id:"b", w:"W1", d:"Wed 20 May", l:"T−21", ti:"LinkedIn Event published", c:"LinkedIn", R:["Mandi"], A:["Pooja"], C:["Alyssa"], I:["All"] },
  { id:"c", w:"W1", d:"Wed 20 May", l:"T−21", ti:"Coffee chat rollout begins — Francois SA first", c:"Content", R:["Francois"], A:["Pooja"], C:["Alyssa"], I:[] },
  { id:"d", w:"W1", d:"Fri 22 May", l:"T−19", ti:"Francois SA coffee chat recording ready", c:"Content", R:["Francois"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"e", w:"W1", d:"Sat 23 May", l:"T−18", ti:"Mukundan kickoff call — content split, slides, dry run", c:"Operations", R:["Pooja"], A:["Pooja"], C:["Mukundan"], I:["Mandi"] },
  { id:"f", w:"W1", d:"Mon 25 May", l:"T−16", ti:"LinkedIn Post 1 — series mid-point, W2 reg open", c:"LinkedIn", R:["Shivaun"], A:["Pooja"], C:[], I:["Nouaama","Ishana","Francois"] },
  { id:"g", w:"W1", d:"Mon 25 May", l:"T−16", ti:"HubSpot cold ICP push — banks, healthcare, public sector", c:"Email", R:["Mandi"], A:["Pooja"], C:[], I:["Ishana"] },
  { id:"h", w:"W1", d:"Wed 27 May", l:"T−14", ti:"LinkedIn Post 2 — why W2 matters (Pooja)", c:"LinkedIn", R:["Pooja"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"i", w:"W1", d:"Wed 27 May", l:"T−14", ti:"Live polls pre-loaded into Teams Webinar", c:"Platform", R:["Mandi"], A:["Mandi"], C:["Ishana"], I:["Pooja"] },
  { id:"j", w:"W1", d:"Wed 27 May", l:"T−14", ti:"Business email domain blocklist deployed in HubSpot", c:"Platform", R:["Mandi"], A:["Mandi"], C:[], I:["Pooja"] },
  { id:"k", w:"W1", d:"Wed 27 May", l:"T−14", ti:"Attendee masking confirmed (Teams Premium locked)", c:"Platform", R:["Mandi"], A:["Shivaun"], C:[], I:["Pooja"] },
  { id:"l", w:"W1", d:"Wed 27 May", l:"T−14", ti:"Registration form live and tested (HubSpot + Teams)", c:"Platform", R:["Mandi"], A:["Mandi"], C:["Alyssa"], I:["Pooja"] },
  { id:"m", w:"W2", d:"Thu 28 May", l:"T−13", ti:"Shivaun coffee chat recording ready", c:"Content", R:["Shivaun"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"n", w:"W2", d:"Thu 28 May", l:"T−13", ti:"Sales team personal LinkedIn push — 13 members", c:"LinkedIn", R:["All"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"o", w:"W2", d:"Mon 1 Jun", l:"T−9", ti:"LinkedIn Post 3 — question-led reflection (Ishana)", c:"LinkedIn", R:["Ishana"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"p", w:"W2", d:"Mon 1 Jun", l:"T−9", ti:"IBM CVA tracker direct outreach (80 contacts)", c:"Sales", R:["Ishana"], A:["Pooja"], C:["Francois","Nouaama"], I:["Mandi"] },
  { id:"q", w:"W2", d:"Wed 3 Jun", l:"T−7", ti:"Email 3 — registrants one-week reminder", c:"Email", R:["Mandi"], A:["Pooja"], C:["Ishana"], I:[] },
  { id:"r", w:"W2", d:"Wed 3 Jun", l:"T−7", ti:"Full technical dry run — all 4 speakers", c:"Operations", R:["Pooja"], A:["Pooja"], C:["Mandi","Mukundan","Ishana","Nouaama"], I:[] },
  { id:"s", w:"W2", d:"Wed 3 Jun", l:"T−7", ti:"Post-webinar follow-up email built in HubSpot", c:"Email", R:["Mandi"], A:["Mandi"], C:["Pooja"], I:["Becca"] },
  { id:"t", w:"W2", d:"Thu 4 Jun", l:"T−6", ti:"LinkedIn Post 4 — IBM speaker spotlight Mukundan", c:"LinkedIn", R:["Pooja"], A:["Pooja"], C:["Mukundan"], I:["Mandi"] },
  { id:"u", w:"W2", d:"Thu 4 Jun", l:"T−6", ti:"Ishana coffee chat recording ready", c:"Content", R:["Ishana"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"v", w:"W2", d:"Sat 5 Jun", l:"T−5", ti:"Mukundan slides confirmed and shared", c:"Operations", R:["Mukundan"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"w", w:"W3", d:"Sat 7 Jun", l:"T−3", ti:"Final speaker run-through (1 hr) — polls tested", c:"Operations", R:["Pooja"], A:["Pooja"], C:["Mandi","Mukundan","Ishana","Nouaama"], I:[] },
  { id:"x", w:"W3", d:"Mon 8 Jun", l:"T−2", ti:"LinkedIn Post 5 — final 2-day push (Nouaama)", c:"LinkedIn", R:["Nouaama"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"y", w:"W3", d:"Mon 8 Jun", l:"T−2", ti:"Email 4 — final push to non-registered ICP", c:"Email", R:["Mandi"], A:["Pooja"], C:[], I:[] },
  { id:"z", w:"W3", d:"Mon 8 Jun", l:"T−2", ti:"Post-webinar email QA by Becca", c:"Email", R:["Becca"], A:["Mandi"], C:["Pooja"], I:[] },
  { id:"A", w:"W3", d:"Tue 9 Jun", l:"T−1", ti:"Email 5 — 24-hour reminder (14:00 GST)", c:"Email", R:["Mandi"], A:["Mandi"], C:[], I:["Pooja"] },
  { id:"B", w:"W3", d:"Tue 9 Jun", l:"T−1", ti:"Final registration export to HubSpot", c:"Platform", R:["Mandi"], A:["Mandi"], C:[], I:["Pooja"] },
  { id:"C", w:"W3", d:"Tue 9 Jun", l:"T−1", ti:"Nouaama coffee chat recording ready", c:"Content", R:["Nouaama"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"D", w:"W3", d:"Wed 10 Jun", l:"T−0 09:00", ti:"Operations stand-up — all speakers + Mandi + Alyssa", c:"Operations", R:["Pooja"], A:["Pooja"], C:["Mandi","Mukundan","Ishana","Nouaama","Alyssa"], I:[] },
  { id:"E", w:"W3", d:"Wed 10 Jun", l:"T−0 09:00", ti:"LinkedIn Post 6 — day-of post (all profiles)", c:"LinkedIn", R:["All"], A:["Pooja"], C:[], I:[] },
  { id:"F", w:"W3", d:"Wed 10 Jun", l:"T−0 13:00", ti:"Speakers join green room — audio + presenter check", c:"Live event", R:["Mandi"], A:["Mandi"], C:["Pooja","Mukundan","Ishana","Nouaama"], I:[] },
  { id:"G", w:"W3", d:"Wed 10 Jun", l:"T−0 13:45", ti:"Lobby opens to attendees", c:"Live event", R:["Mandi"], A:["Mandi"], C:[], I:["All"] },
  { id:"H", w:"W3", d:"Wed 10 Jun", l:"T−0 14:00", ti:"LIVE — IBM CVA Decoded (45 min)", c:"Live event", R:["Pooja"], A:["Pooja"], C:["Mukundan","Ishana","Nouaama","Mandi"], I:["Shivaun"] },
  { id:"I", w:"W3", d:"Wed 10 Jun", l:"T−0 15:15", ti:"Post-event email auto-fires (attendees + no-shows)", c:"Email", R:["Mandi"], A:["Pooja"], C:[], I:["Ishana"] },
  { id:"J", w:"W3", d:"Wed 10 Jun", l:"T−0 15:30", ti:"Pooja's pod: same-day CVA follow-ups (Poll 5 yes)", c:"Sales", R:["Pooja"], A:["Pooja"], C:[], I:["Mandi"] },
  { id:"K", w:"W4", d:"Thu 11 Jun", l:"T+1", ti:"Internal debrief — what worked, fixes for W3", c:"Operations", R:["Shivaun"], A:["Shivaun"], C:["Pooja"], I:["Mandi","Ishana","Nouaama"] },
  { id:"L", w:"W4", d:"Thu 11 Jun", l:"T+1", ti:"LinkedIn Post 7 — post-event recap + W3 promo", c:"LinkedIn", R:["Pooja"], A:["Pooja"], C:[], I:["Ishana","Nouaama"] },
  { id:"M", w:"W4", d:"Thu 11 Jun", l:"T+1", ti:"CVA discovery call follow-ups for all opt-ins", c:"Sales", R:["Pooja"], A:["Pooja"], C:["Ishana"], I:["Mandi"] },
  { id:"N", w:"W4", d:"By 14 Jun", l:"T+4", ti:"5-min highlight reel produced from recording", c:"Content", R:["Mandi"], A:["Pooja"], C:[], I:["All"] },
  { id:"O", w:"W4", d:"By 24 Jun", l:"T+14", ti:"10 CVA discovery calls booked (HubSpot metric)", c:"Sales", R:["Pooja"], A:["Pooja"], C:["Ishana","Francois","Nouaama"], I:["Shivaun"] },
];

function ConnorLogo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="#31B0F1" strokeWidth="2" fill="none"/>
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="#31B0F1" strokeWidth="1.5" fill="none"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="#31B0F1" strokeWidth="1" opacity="0.5"/>
        <line x1="15" y1="30" x2="85" y2="70" stroke="#31B0F1" strokeWidth="1" opacity="0.5"/>
        <line x1="85" y1="30" x2="15" y2="70" stroke="#31B0F1" strokeWidth="1" opacity="0.5"/>
        <line x1="50" y1="10" x2="85" y2="70" stroke="#31B0F1" strokeWidth="1" opacity="0.4"/>
        <line x1="50" y1="10" x2="15" y2="70" stroke="#31B0F1" strokeWidth="1" opacity="0.4"/>
        <line x1="15" y1="30" x2="50" y2="90" stroke="#31B0F1" strokeWidth="1" opacity="0.4"/>
        <line x1="85" y1="30" x2="50" y2="90" stroke="#31B0F1" strokeWidth="1" opacity="0.4"/>
      </svg>
      <span style={{ fontSize:22, fontWeight:700, color:"#fff", letterSpacing:2, fontFamily:"Arial, sans-serif" }}>CONNOR</span>
    </div>
  );
}

function Avatar({ name }) {
  const p = PEOPLE[name] || PEOPLE.All;
  const init = name === "All" ? "★" : name.slice(0, 2);
  return (
    <span style={{ width:15, height:15, borderRadius:"50%", background:p.c, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, flexShrink:0 }}>
      {init}
    </span>
  );
}

function RaciBadge({ name, role }) {
  const s = RACI_STYLES[role];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:10, padding:"2px 5px", borderRadius:20, background:s.bg, color:s.co, fontFamily:"Arial, sans-serif" }}>
      <Avatar name={name} />
      {name} <b>{role}</b>
    </span>
  );
}

function TaskCard({ task, done, onToggle }) {
  const s = CAT_STYLES[task.c] || CAT_STYLES.Operations;
  const all = [
    ...task.R.map(n => ({ n, r:"R" })),
    ...task.A.map(n => ({ n, r:"A" })),
    ...task.C.map(n => ({ n, r:"C" })),
    ...task.I.map(n => ({ n, r:"I" })),
  ];
  return (
    <div style={{ background:"#fff", border:"1px solid #E1E7F1", borderLeft:`3px solid ${s.b}`, borderRadius:8, padding:"11px 11px 11px 12px", position:"relative", opacity:done ? 0.45 : 1, transition:"opacity .15s", fontFamily:"Arial, sans-serif" }}>
      <div style={{ position:"absolute", top:10, right:8 }}>
        <input type="checkbox" checked={done} onChange={() => onToggle(task.id)} style={{ width:15, height:15, cursor:"pointer", accentColor:"#FB7F38" }} aria-label="Mark complete" />
      </div>
      <div style={{ fontSize:10, color:"#6B8BBC", marginBottom:3 }}>{task.d} · {task.l}</div>
      <div style={{ fontSize:13, fontWeight:600, color:"#02283A", lineHeight:1.35, marginBottom:7, paddingRight:20, textDecoration:done ? "line-through" : "none" }}>{task.ti}</div>
      <span style={{ display:"inline-block", fontSize:10, padding:"2px 7px", borderRadius:20, marginBottom:7, background:s.bg, color:s.co, fontWeight:600 }}>{task.c}</span>
      <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
        {all.map((x, i) => <RaciBadge key={i} name={x.n} role={x.r} />)}
      </div>
    </div>
  );
}

export default function App() {
  const [checked, setChecked] = useState({});
  const [activeWeek, setActiveWeek] = useState("all");
  const [activePerson, setActivePerson] = useState("all");
  const [hideDone, setHideDone] = useState(false);

  function toggle(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function matchesPerson(t) {
    if (activePerson === "all") return true;
    return [...t.R, ...t.A, ...t.C, ...t.I].some(x => x === activePerson || x === "All");
  }

  const filtered = TASKS.filter(t => (activeWeek === "all" || t.w === activeWeek) && matchesPerson(t));
  const visible = hideDone ? filtered.filter(t => !checked[t.id]) : filtered;
  const byWeek = {};
  visible.forEach(t => { if (!byWeek[t.w]) byWeek[t.w] = []; byWeek[t.w].push(t); });

  const totalDone = TASKS.filter(t => checked[t.id]).length;
  const pct = Math.round(totalDone / TASKS.length * 100);
  const filtDone = filtered.filter(t => checked[t.id]).length;

  const weeks = [
    { id:"all", label:"All Weeks" }, { id:"W1", label:"Week 1 · 20–27 May" },
    { id:"W2", label:"Week 2 · 28 May–6 Jun" }, { id:"W3", label:"Week 3 · 7–10 Jun" },
    { id:"W4", label:"Week 4 · Post-event" },
  ];

  return (
    <div style={{ fontFamily:"Arial, sans-serif", background:"#F4F7FA", minHeight:"100vh" }}>
      <div style={{ background:"#02283A", padding:"1rem 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"3px solid #FB7F38" }}>
        <ConnorLogo />
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#31B0F1", letterSpacing:1, textTransform:"uppercase" }}>Webinar 2 — IBM CVA Decoded</div>
          <div style={{ fontSize:11, color:"#6B8BBC", marginTop:2 }}>Task Dashboard · 10 June 2026</div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"1.5rem" }}>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:"1rem" }}>
          {[{ n:filtered.length, l:"Tasks Shown", accent:"#02283A" }, { n:filtDone, l:"Completed", accent:"#0E87C3" }, { n:filtered.length-filtDone, l:"Remaining", accent:"#FB7F38" }].map((s,i) => (
            <div key={i} style={{ background:"#fff", border:"1px solid #E1E7F1", borderTop:`3px solid ${s.accent}`, borderRadius:8, padding:"10px 16px", flex:1, minWidth:90 }}>
              <div style={{ fontSize:22, fontWeight:700, color:s.accent }}>{s.n}</div>
              <div style={{ fontSize:11, color:"#6B8BBC", marginTop:2, textTransform:"uppercase", letterSpacing:.5 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"#fff", border:"1px solid #E1E7F1", borderRadius:8, padding:"10px 16px", marginBottom:"1rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6B8BBC", marginBottom:6, textTransform:"uppercase", letterSpacing:.5 }}>
            <span>Overall Progress</span><span style={{ color:"#FB7F38", fontWeight:700 }}>{pct}%</span>
          </div>
          <div style={{ height:6, background:"#E1E7F1", borderRadius:3, overflow:"hidden" }}>
            <div style={{ height:6, width:pct+"%", background:"linear-gradient(90deg,#034F76,#31B0F1)", borderRadius:3, transition:"width .3s" }} />
          </div>
          <div style={{ fontSize:11, color:"#6B8BBC", marginTop:5 }}>{totalDone} of {TASKS.length} tasks completed</div>
        </div>

        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:"1rem" }}>
          {weeks.map(w => (
            <button key={w.id} onClick={() => setActiveWeek(w.id)} style={{ fontSize:11, padding:"6px 13px", border:"1px solid", borderRadius:4, cursor:"pointer", fontFamily:"Arial,sans-serif", fontWeight:600, letterSpacing:.3, textTransform:"uppercase", background:activeWeek===w.id?"#02283A":"#fff", color:activeWeek===w.id?"#fff":"#02283A", borderColor:activeWeek===w.id?"#02283A":"#E1E7F1" }}>{w.label}</button>
          ))}
        </div>

        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:".75rem", alignItems:"center", fontSize:11, color:"#6B8BBC", background:"#fff", border:"1px solid #E1E7F1", borderRadius:8, padding:"8px 14px" }}>
          <b style={{ color:"#02283A", textTransform:"uppercase", letterSpacing:.5 }}>RACI:</b>
          {Object.entries(RACI_STYLES).map(([r,s]) => (
            <span key={r} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ width:18, height:18, borderRadius:4, background:s.bg, color:s.co, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700 }}>{r}</span>
              <span style={{ color:"#3B5781" }}>{{ R:"Responsible", A:"Accountable", C:"Consulted", I:"Informed" }[r]}</span>
            </span>
          ))}
        </div>

        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:"1.25rem", alignItems:"center" }}>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap", flex:1 }}>
            <button onClick={() => setActivePerson("all")} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, border:activePerson==="all"?"2px solid #02283A":"1px solid #E1E7F1", background:activePerson==="all"?"#02283A":"#fff", color:activePerson==="all"?"#fff":"#3B5781", cursor:"pointer", fontFamily:"Arial,sans-serif", fontWeight:600 }}>All People</button>
            {Object.entries(PEOPLE).filter(([k]) => k !== "All").map(([name,p]) => (
              <button key={name} onClick={() => setActivePerson(name)} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, border:activePerson===name?`2px solid ${p.c}`:`1px solid ${p.c}`, background:p.bg, color:p.t, cursor:"pointer", fontFamily:"Arial,sans-serif", fontWeight:600 }}>{name}</button>
            ))}
          </div>
          <button onClick={() => setHideDone(h => !h)} style={{ fontSize:11, padding:"4px 12px", borderRadius:4, border:"1px solid", cursor:"pointer", fontFamily:"Arial,sans-serif", fontWeight:600, textTransform:"uppercase", letterSpacing:.3, background:hideDone?"#034F76":"#fff", color:hideDone?"#fff":"#034F76", borderColor:"#034F76" }}>{hideDone?"Show Done":"Hide Done"}</button>
          <button onClick={() => { if(Object.values(checked).some(Boolean)&&window.confirm("Clear all checkboxes?"))setChecked({}); }} style={{ fontSize:11, padding:"4px 10px", borderRadius:4, border:"1px solid #E1E7F1", background:"#fff", color:"#6B8BBC", cursor:"pointer", fontFamily:"Arial,sans-serif" }}>Reset</button>
        </div>

        {Object.keys(byWeek).length===0
          ? <div style={{ textAlign:"center", padding:"3rem", color:"#6B8BBC", fontSize:13 }}>No tasks match this filter.</div>
          : Object.entries(byWeek).map(([wk,wTasks]) => {
            const wDone=TASKS.filter(t=>t.w===wk&&checked[t.id]).length;
            const wTotal=TASKS.filter(t=>t.w===wk&&matchesPerson(t)).length;
            return (
              <div key={wk}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", margin:"16px 0 8px", paddingBottom:6, borderBottom:"2px solid #02283A" }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#02283A", letterSpacing:1, textTransform:"uppercase" }}>{WEEK_LABELS[wk]}</span>
                  <span style={{ fontSize:11, color:"#FB7F38", fontWeight:700 }}>{wDone}/{wTotal} done</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
                  {wTasks.map(t => <TaskCard key={t.id} task={t} done={!!checked[t.id]} onToggle={toggle} />)}
                </div>
              </div>
            );
          })
        }

        <div style={{ marginTop:"2rem", paddingTop:"1rem", borderTop:"1px solid #E1E7F1", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#6B8BBC" }}>Connor Consulting × IBM · Webinar 2 · 2026</span>
          <span style={{ fontSize:11, color:"#FB7F38", fontWeight:700 }}>CONNOR</span>
        </div>
      </div>
    </div>
  );
}
