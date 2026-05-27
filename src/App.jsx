import { useState } from "react";

const PEOPLE = {
  Pooja:    { c: "#185FA5", bg: "#E6F1FB", t: "#0C447C" },
  Mandi:    { c: "#0F6E56", bg: "#E1F5EE", t: "#085041" },
  Ishana:   { c: "#533AB7", bg: "#EEEDFE", t: "#3C3489" },
  Nouaama:  { c: "#BA7517", bg: "#FAEEDA", t: "#633806" },
  Shivaun:  { c: "#3B6D11", bg: "#EAF3DE", t: "#27500A" },
  Francois: { c: "#993C1D", bg: "#FAECE7", t: "#712B13" },
  Mukundan: { c: "#A32D2D", bg: "#FCEBEB", t: "#791F1F" },
  Becca:    { c: "#993556", bg: "#FBEAF0", t: "#72243E" },
  Alyssa:   { c: "#5F5E5A", bg: "#F1EFE8", t: "#444441" },
  All:      { c: "#888780", bg: "#F1EFE8", t: "#5F5E5A" },
};

const CAT_STYLES = {
  Email:        { bg: "#E6F1FB", co: "#0C447C", b: "#185FA5" },
  LinkedIn:     { bg: "#EAF3DE", co: "#27500A", b: "#3B6D11" },
  Platform:     { bg: "#EEEDFE", co: "#3C3489", b: "#534AB7" },
  Content:      { bg: "#FAEEDA", co: "#633806", b: "#BA7517" },
  "Live event": { bg: "#FCEBEB", co: "#791F1F", b: "#A32D2D" },
  Operations:   { bg: "#F1EFE8", co: "#444441", b: "#888780" },
  Sales:        { bg: "#FBEAF0", co: "#72243E", b: "#993556" },
};

const RACI_STYLES = {
  R: { bg: "#E6F1FB", co: "#0C447C" },
  A: { bg: "#EAF3DE", co: "#27500A" },
  C: { bg: "#FAEEDA", co: "#633806" },
  I: { bg: "#F1EFE8", co: "#444441" },
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

function Avatar({ name }) {
  const p = PEOPLE[name] || PEOPLE.All;
  const init = name === "All" ? "★" : name.slice(0, 2);
  return (
    <span style={{ width:15, height:15, borderRadius:"50%", background:p.c, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:600, flexShrink:0 }}>
      {init}
    </span>
  );
}

function RaciBadge({ name, role }) {
  const s = RACI_STYLES[role];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:10, padding:"2px 5px", borderRadius:20, background:s.bg, color:s.co }}>
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
    <div style={{ background:"#fff", border:"0.5px solid #e5e5e5", borderLeft:`3px solid ${s.b}`, borderRadius:12, padding:"11px 11px 11px 12px", position:"relative", opacity:done ? 0.45 : 1, transition:"opacity .15s" }}>
      <div style={{ position:"absolute", top:10, right:8 }}>
        <input type="checkbox" checked={done} onChange={() => onToggle(task.id)} style={{ width:15, height:15, cursor:"pointer", accentColor:"#185FA5" }} aria-label="Mark complete" />
      </div>
      <div style={{ fontSize:10, color:"#999", marginBottom:3 }}>{task.d} · {task.l}</div>
      <div style={{ fontSize:13, fontWeight:500, color:"#111", lineHeight:1.35, marginBottom:7, paddingRight:20, textDecoration:done ? "line-through" : "none" }}>{task.ti}</div>
      <span style={{ display:"inline-block", fontSize:10, padding:"2px 7px", borderRadius:20, marginBottom:7, background:s.bg, color:s.co }}>{task.c}</span>
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
    { id:"all", label:"All weeks" }, { id:"W1", label:"Week 1 · 20–27 May" },
    { id:"W2", label:"Week 2 · 28 May–6 Jun" }, { id:"W3", label:"Week 3 · 7–10 Jun" },
    { id:"W4", label:"Week 4 · Post-event" },
  ];

  return (
    <div style={{ maxWidth:960, margin:"0 auto", padding:"2rem 1.5rem", fontFamily:"system-ui, sans-serif" }}>
      <h1 style={{ fontSize:22, fontWeight:600, color:"#111", marginBottom:4 }}>Webinar 2 — IBM CVA Decoded</h1>
      <p style={{ fontSize:13, color:"#666", marginBottom:"1.5rem" }}>Task dashboard · 10 June 2026 · Connor Consulting × IBM</p>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:"1rem" }}>
        {[{ n:filtered.length, l:"tasks shown" }, { n:filtDone, l:"done", col:"#3B6D11" }, { n:filtered.length - filtDone, l:"remaining", col:"#BA7517" }].map((s, i) => (
          <div key={i} style={{ background:"#f5f5f5", borderRadius:8, padding:"6px 14px", flex:1, minWidth:80 }}>
            <div style={{ fontSize:20, fontWeight:600, color:s.col || "#111" }}>{s.n}</div>
            <div style={{ fontSize:11, color:"#888", marginTop:1 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize:11, color:"#888", marginBottom:4 }}>{totalDone} of {TASKS.length} tasks completed ({pct}%)</div>
      <div style={{ height:4, background:"#eee", borderRadius:2, marginBottom:"1.5rem", overflow:"hidden" }}>
        <div style={{ height:4, width:pct+"%", background:"#185FA5", borderRadius:2, transition:"width .25s" }} />
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:"1rem" }}>
        {weeks.map(w => (
          <button key={w.id} onClick={() => setActiveWeek(w.id)} style={{ fontSize:12, padding:"5px 12px", border:"1px solid", borderRadius:8, cursor:"pointer", background:activeWeek===w.id ? "#185FA5" : "#fff", color:activeWeek===w.id ? "#fff" : "#555", borderColor:activeWeek===w.id ? "#185FA5" : "#ddd" }}>{w.label}</button>
        ))}
      </div>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:".75rem", alignItems:"center", fontSize:11, color:"#666" }}>
        <b>RACI:</b>
        {Object.entries(RACI_STYLES).map(([r, s]) => (
          <span key={r} style={{ display:"flex", alignItems:"center", gap:3 }}>
            <span style={{ width:17, height:17, borderRadius:3, background:s.bg, color:s.co, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700 }}>{r}</span>
            {{ R:"Responsible", A:"Accountable", C:"Consulted", I:"Informed" }[r]}
          </span>
        ))}
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:"1.25rem", alignItems:"center" }}>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap", flex:1 }}>
          <button onClick={() => setActivePerson("all")} style={{ fontSize:11, padding:"3px 9px", borderRadius:20, border:activePerson==="all" ? "1.5px solid #aaa" : "1px solid #ddd", background:"#fff", color:"#555", cursor:"pointer" }}>All people</button>
          {Object.entries(PEOPLE).filter(([k]) => k !== "All").map(([name, p]) => (
            <button key={name} onClick={() => setActivePerson(name)} style={{ fontSize:11, padding:"3px 9px", borderRadius:20, border:activePerson===name ? `1.5px solid ${p.c}` : `1px solid ${p.c}`, background:p.bg, color:p.t, cursor:"pointer" }}>{name}</button>
          ))}
        </div>
        <button onClick={() => setHideDone(h => !h)} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, border:"1px solid", cursor:"pointer", background:hideDone ? "#EAF3DE" : "#fff", color:hideDone ? "#27500A" : "#555", borderColor:hideDone ? "#3B6D11" : "#ddd" }}>{hideDone ? "Show done" : "Hide done"}</button>
        <button onClick={() => { if (Object.values(checked).some(Boolean) && window.confirm("Clear all checkboxes?")) setChecked({}); }} style={{ fontSize:11, padding:"3px 9px", borderRadius:8, border:"1px solid #ddd", background:"none", color:"#888", cursor:"pointer" }}>Reset</button>
      </div>
      {Object.keys(byWeek).length === 0
        ? <div style={{ textAlign:"center", padding:"3rem", color:"#aaa", fontSize:13 }}>No tasks match this filter.</div>
        : Object.entries(byWeek).map(([wk, wTasks]) => {
          const wDone = TASKS.filter(t => t.w === wk && checked[t.id]).length;
          const wTotal = TASKS.filter(t => t.w === wk && matchesPerson(t)).length;
          return (
            <div key={wk}>
              <div style={{ fontSize:11, fontWeight:600, color:"#aaa", letterSpacing:".5px", textTransform:"uppercase", margin:"16px 0 8px", paddingBottom:4, borderBottom:"1px solid #eee", display:"flex", justifyContent:"space-between" }}>
                <span>{WEEK_LABELS[wk]}</span>
                <span style={{ textTransform:"none", letterSpacing:0, fontWeight:400 }}>{wDone}/{wTotal} done</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:10 }}>
                {wTasks.map(t => <TaskCard key={t.id} task={t} done={!!checked[t.id]} onToggle={toggle} />)}
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
