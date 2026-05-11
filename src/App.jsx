import { useState, useRef, useEffect } from "react";

const G = "#0ea371";

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #0a120d; }
  @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { animation: fadeUp 0.35s ease forwards; }
  .card { background: #0f1a14; border: 1.5px solid #1a3522; border-radius: 18px; }
  input, textarea, select { outline: none; font-family: inherit; }
  input::placeholder, textarea::placeholder { color: #3d6b52; }
  button { font-family: inherit; }
  button:active { opacity: 0.85; }
  @media (max-width: 600px) {
    .pricing-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .hero-h1 { font-size: 24px !important; }
    .nav-label { display: none !important; }
    .admin-msgs { display: none !important; }
  }
`;

function Nav({ view, setView }) {
  const tabs = [["pricing","💰","Pricing"],["demo","🤖","Live Demo"],["admin","📊","Admin"]];
  return (
    <nav style={{ background: "#0f1a14", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #1a3522" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🤖</div>
        <span style={{ color: "white", fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>ReplyAI</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {tabs.map(([v, icon, label]) => (
          <button key={v} onClick={() => setView(v)}
            style={{ padding: "7px 13px", borderRadius: 8, border: "none", fontSize: 13, cursor: "pointer", background: view === v ? G : "transparent", color: view === v ? "white" : "#7a9b87", fontWeight: view === v ? 700 : 400 }}>
            <span>{icon}</span> <span className="nav-label">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

const plans = [
  { name: "Starter", price: 29, badge: null, bg: "#1a2e22", features: ["Website chat widget", "Answer FAQs & hours", "Share prices & info", "Email support"] },
  { name: "Growth", price: 59, badge: "Most Popular", bg: "#0b3d28", features: ["Everything in Starter", "WhatsApp integration", "Booking management", "Urgent owner alerts", "Priority support"] },
  { name: "Pro", price: 99, badge: "Best Value", bg: "#062318", accent: "#f0c040", features: ["Everything in Growth", "Instagram & Facebook DMs", "Email auto-replies", "Custom assistant name", "Analytics dashboard", "Dedicated onboarding"] },
];

function PricingPage({ setView, setPlan }) {
  return (
    <div style={{ background: "#0a120d", minHeight: "calc(100vh - 56px)", padding: "40px 16px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ background: "#1a2e22", color: G, fontSize: 12, padding: "4px 14px", borderRadius: 20, fontWeight: 600 }}>Simple Pricing · No Surprises</span>
        <h1 className="hero-h1" style={{ color: "white", fontSize: 32, fontWeight: 800, margin: "16px 0 10px", lineHeight: 1.25 }}>Your business never stops.<br />Neither does James.</h1>
        <p style={{ color: "#7a9b87", fontSize: 15, margin: 0 }}>14-day free trial · No credit card needed · Cancel anytime</p>
      </div>
      <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 780, margin: "0 auto 48px" }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ background: plan.bg, border: `1.5px solid ${plan.badge === "Most Popular" ? G : "#1a2e22"}`, borderRadius: 18, padding: 22, position: "relative", display: "flex", flexDirection: "column" }}>
            {plan.badge && (
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: plan.accent || G, color: plan.name === "Pro" ? "#0a120d" : "white", fontSize: 10, fontWeight: 800, padding: "3px 12px", borderRadius: 20, whiteSpace: "nowrap" }}>{plan.badge}</div>
            )}
            <p style={{ color: "#7a9b87", fontSize: 12, margin: "0 0 4px", fontWeight: 600 }}>{plan.name}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 18 }}>
              <span style={{ color: "white", fontSize: 34, fontWeight: 800 }}>${plan.price}</span>
              <span style={{ color: "#7a9b87", fontSize: 13 }}>/mo</span>
            </div>
            <div style={{ flex: 1, marginBottom: 20 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
                  <span style={{ color: G, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ color: "#c5dfd0", fontSize: 13, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setPlan(plan); setView("setup"); }}
              style={{ width: "100%", padding: "11px", borderRadius: 12, border: "none", background: plan.badge === "Most Popular" ? G : "#1a3522", color: plan.badge === "Most Popular" ? "white" : G, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Start Free Trial
            </button>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[["500+","Businesses served"],["24/7","Always online"],["98%","Happy customers"],["3 min","Setup time"]].map(([s, l]) => (
            <div key={s} style={{ background: "#1a2e22", borderRadius: 14, padding: "18px 14px", textAlign: "center" }}>
              <p style={{ color: G, fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>{s}</p>
              <p style={{ color: "#7a9b87", fontSize: 12, margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetupPage({ plan, setView }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ businessName: "", ownerName: "", phone: "", hours: "Mon-Sat 9am-6pm, Sun Closed", services: "", faqs: "", urgentPhone: "" });
  const uid = useRef("biz_" + Math.random().toString(36).slice(2, 8));

  const steps = [
    { title: "Business Info", emoji: "🏪", fields: [
      { key: "businessName", label: "Business Name", ph: "e.g. Bella's Salon" },
      { key: "ownerName", label: "Your Name", ph: "e.g. Sarah Ahmed" },
      { key: "phone", label: "Phone / WhatsApp", ph: "+971 50 000 0000" },
    ]},
    { title: "What You Offer", emoji: "💼", fields: [
      { key: "hours", label: "Opening Hours", ph: "Mon-Sat 9am-6pm, Sun Closed" },
      { key: "services", label: "Services & Prices", ph: "Haircut $30, Colour $80...", multi: true },
      { key: "faqs", label: "FAQs (Q & A)", ph: "Do you accept walk-ins? Yes!\nIs parking free? Yes.", multi: true },
    ]},
    { title: "Alerts & Activation", emoji: "🚨", fields: [
      { key: "urgentPhone", label: "Owner Alert Phone (for urgent messages)", ph: "+971 50 000 0000" },
    ]},
  ];

  const embedCode = `<script src="https://replyai.app/w.js" data-id="${uid.current}"><\/script>`;

  if (done) return (
    <div style={{ background: "#0a120d", minHeight: "calc(100vh - 56px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="card fade-up" style={{ padding: 32, maxWidth: 440, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>James is live!</h2>
        <p style={{ color: "#7a9b87", fontSize: 14, margin: "0 0 24px" }}>Your AI assistant is ready to handle customers 24/7 for {form.businessName || "your business"}.</p>
        <div style={{ background: "#0a120d", borderRadius: 10, padding: 14, marginBottom: 20, textAlign: "left" }}>
          <p style={{ color: "#7a9b87", fontSize: 11, margin: "0 0 6px", fontWeight: 600 }}>PASTE THIS ON YOUR WEBSITE</p>
          <code style={{ color: G, fontSize: 11, fontFamily: "monospace", wordBreak: "break-all", lineHeight: 1.6 }}>{embedCode}</code>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => setView("demo")} style={{ flex: 1, minWidth: 120, padding: "12px", borderRadius: 12, border: "none", background: G, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try James Live 🤖</button>
          <button onClick={() => setView("admin")} style={{ flex: 1, minWidth: 120, padding: "12px", borderRadius: 12, border: "1.5px solid #1a3522", background: "transparent", color: "#7a9b87", fontSize: 14, cursor: "pointer" }}>Dashboard</button>
        </div>
      </div>
    </div>
  );

  const cur = steps[step];
  return (
    <div style={{ background: "#0a120d", minHeight: "calc(100vh - 56px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ maxWidth: 460, width: "100%" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 4, background: i <= step ? G : "#1a2e22", transition: "background 0.3s", marginBottom: 6 }} />
              <p style={{ color: i === step ? G : "#3d6b52", fontSize: 11, margin: 0, fontWeight: i === step ? 700 : 400, textAlign: "center" }}>{s.emoji} {s.title}</p>
            </div>
          ))}
        </div>
        <div className="card fade-up" style={{ padding: "28px 24px" }}>
          <p style={{ color: G, fontSize: 12, fontWeight: 700, margin: "0 0 4px" }}>{plan?.name} Plan</p>
          <h2 style={{ color: "white", fontSize: 20, fontWeight: 800, margin: "0 0 22px" }}>{cur.emoji} {cur.title}</h2>
          {cur.fields.map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "#7a9b87", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{f.label}</label>
              {f.multi ? (
                <textarea value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph} rows={3}
                  style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: "1.5px solid #1a3522", background: "#0a120d", color: "white", fontSize: 13, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }} />
              ) : (
                <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph}
                  style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: "1.5px solid #1a3522", background: "#0a120d", color: "white", fontSize: 13 }} />
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1.5px solid #1a3522", background: "transparent", color: "#7a9b87", fontSize: 14, cursor: "pointer" }}>Back</button>}
            <button onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : setDone(true)}
              style={{ flex: 2, padding: "12px", borderRadius: 12, border: "none", background: G, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              {step < steps.length - 1 ? "Continue →" : "🚀 Launch James!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoPage() {
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Hey! 👋 I'm James, your AI assistant for Bella's Salon. I'm here 24/7 — how can I help you today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    const history = [...msgs, { role: "user", text: msg }];
    setMsgs(history);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are James, a warm and professional AI assistant for "Bella's Salon" in Dubai. You help customers 24/7 when the owner is unavailable.

Business details:
- Salon: Bella's Salon, 14 Marina Walk, Dubai Marina
- Owner: Sarah | Phone: +971-50-123-4567
- Hours: Mon-Sat 9am-7pm | Sun 11am-5pm

Services & Prices:
- Women's haircut $30 | Men's $20 | Kids $15
- Blow dry $25 | Updo $45
- Full colour $90 | Highlights $70
- Keratin treatment $120
- Manicure $25 | Pedicure $35 | Combo $55

FAQs:
- Walk-ins welcome, booking recommended
- Free parking at the marina
- Cash and card accepted
- Book via WhatsApp: +971-50-123-4567

Style: warm, friendly, concise (2-3 sentences max). Always offer further help at the end.
If message sounds urgent: say you are alerting Sarah now and she will respond within 30 minutes.`,
          messages: history.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Give me just a moment — let me get that for you!";
      setMsgs(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", text: "Sorry, had a hiccup! Please try again." }]);
    }
    setLoading(false);
  };

  const quick = ["What are your prices?", "Are you open Sunday?", "I want to book", "This is urgent!"];

  return (
    <div style={{ background: "#0a120d", minHeight: "calc(100vh - 56px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
      <div style={{ maxWidth: 500, width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "white", fontSize: 19, fontWeight: 800, margin: "0 0 4px" }}>Talk to James — Live AI</h2>
          <p style={{ color: "#7a9b87", fontSize: 13, margin: "0 0 12px" }}>Powered by real AI · Ask anything a customer would</p>
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid #1a3522" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "white" }}>James</p>
              <p style={{ margin: 0, fontSize: 11, color: G }}>● Online · Bella's Salon</p>
            </div>
          </div>
          <div style={{ height: 300, overflowY: "auto", padding: "14px 14px 6px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "82%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? G : "#1a2e22", color: m.role === "user" ? "white" : "#c5dfd0", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "10px 14px", background: "#1a2e22", borderRadius: "16px 16px 16px 4px", width: "fit-content" }}>
                {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: G, animation: `bounce 1s infinite ${d}s` }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "8px 12px 6px", borderTop: "1px solid #1a3522", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {quick.map(q => (
              <button key={q} onClick={() => send(q)} style={{ fontSize: 11, padding: "5px 11px", borderRadius: 16, border: "1px solid #1a3522", background: "transparent", color: "#7a9b87", cursor: "pointer" }}>{q}</button>
            ))}
          </div>
          <div style={{ padding: "10px 12px", borderTop: "1px solid #1a3522", display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type your message to James..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: 24, border: "1.5px solid #1a3522", background: "#0a120d", color: "white", fontSize: 13 }} />
            <button onClick={() => send()} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: G, color: "white", cursor: "pointer", fontSize: 17, flexShrink: 0 }}>➤</button>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#3d6b52", fontSize: 12, margin: 0 }}>This is what your customers experience on your website</p>
        <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
      </div>
    </div>
  );
}

const clients = [
  { name: "Bella's Salon", owner: "Sarah Ahmed", plan: "Growth", status: "active", rev: 59, msgs: 342, joined: "Apr 2025" },
  { name: "Zara Boutique", owner: "Fatima Al Rashid", plan: "Pro", status: "active", rev: 99, msgs: 518, joined: "Mar 2025" },
  { name: "Spice Garden", owner: "Raj Patel", plan: "Starter", status: "active", rev: 29, msgs: 189, joined: "May 2025" },
  { name: "FitZone Gym", owner: "Omar Hassan", plan: "Growth", status: "trial", rev: 0, msgs: 94, joined: "May 2025" },
  { name: "Glow Clinic", owner: "Lina Khoury", plan: "Pro", status: "active", rev: 99, msgs: 721, joined: "Feb 2025" },
];
const pBg = { Starter: "#1a3522", Growth: "#0b3d28", Pro: "#2a1f0a" };
const pTx = { Starter: G, Growth: G, Pro: "#f0c040" };

function AdminPage() {
  const [q, setQ] = useState("");
  const mrr = clients.filter(c => c.status === "active").reduce((s, c) => s + c.rev, 0);
  const list = clients.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.owner.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ background: "#0a120d", minHeight: "calc(100vh - 56px)", padding: "24px 16px 40px" }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ color: "white", fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>Admin Dashboard</h2>
          <p style={{ color: "#7a9b87", fontSize: 13, margin: 0 }}>Your ReplyAI business overview</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
          {[
            { l: "Monthly Revenue", v: `$${mrr}`, s: "MRR" },
            { l: "Active Clients", v: clients.filter(c => c.status === "active").length, s: "paying now" },
            { l: "Free Trials", v: clients.filter(c => c.status === "trial").length, s: "this month" },
            { l: "Messages Handled", v: clients.reduce((s, c) => s + c.msgs, 0).toLocaleString(), s: "by James" },
          ].map(({ l, v, s }) => (
            <div key={l} className="card" style={{ padding: "16px", borderRadius: 14 }}>
              <p style={{ color: "#7a9b87", fontSize: 11, margin: "0 0 5px", fontWeight: 600 }}>{l.toUpperCase()}</p>
              <p style={{ color: "white", fontSize: 24, fontWeight: 800, margin: "0 0 2px" }}>{v}</p>
              <p style={{ color: "#3d6b52", fontSize: 11, margin: 0 }}>{s}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ overflow: "hidden", borderRadius: 16 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a3522", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <span style={{ color: "white", fontSize: 15, fontWeight: 700 }}>Clients ({list.length})</span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." style={{ padding: "7px 13px", borderRadius: 10, border: "1.5px solid #1a3522", background: "#0a120d", color: "white", fontSize: 13, width: 150 }} />
          </div>
          {list.map((c, i) => (
            <div key={c.name} style={{ padding: "14px 18px", borderBottom: i < list.length - 1 ? "1px solid #1a3522" : "none", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: pBg[c.plan], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>🏪</div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <p style={{ color: "white", fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>{c.name}</p>
                <p style={{ color: "#7a9b87", fontSize: 12, margin: 0 }}>{c.owner} · {c.joined}</p>
              </div>
              <div className="admin-msgs" style={{ textAlign: "right" }}>
                <p style={{ color: "white", fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>{c.msgs.toLocaleString()}</p>
                <p style={{ color: "#3d6b52", fontSize: 11, margin: 0 }}>messages</p>
              </div>
              <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 8, background: pBg[c.plan], color: pTx[c.plan], fontWeight: 700 }}>{c.plan}</span>
              <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 8, background: c.status === "active" ? "#0b3d28" : "#2a1f0a", color: c.status === "active" ? G : "#f0c040", fontWeight: 600 }}>
                {c.status === "active" ? `$${c.rev}/mo` : "Trial"}
              </span>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 16, padding: "16px 20px", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <p style={{ color: "white", fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>Annual Revenue Projection</p>
            <p style={{ color: "#7a9b87", fontSize: 13, margin: 0 }}>Based on active subscriptions</p>
          </div>
          <p style={{ color: G, fontSize: 30, fontWeight: 800, margin: 0 }}>${(mrr * 12).toLocaleString()}/yr</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("pricing");
  const [plan, setPlan] = useState(null);
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh" }}>
      <style>{css}</style>
      <Nav view={view} setView={setView} />
      {view === "pricing" && <PricingPage setView={setView} setPlan={setPlan} />}
      {view === "setup" && <SetupPage plan={plan} setView={setView} />}
      {view === "demo" && <DemoPage />}
      {view === "admin" && <AdminPage />}
    </div>
  );
}
