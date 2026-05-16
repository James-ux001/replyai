import { useState, useEffect, useRef } from "react";

const G = "#00E676";
const G2 = "#22C55E";
const DARK = "#0a0f0d";
const CARD = "#111816";
const BORDER = "#1e2d24";
const TEXT = "#a0bfaa";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',sans-serif;background:#0a0f0d;color:#fff;overflow-x:hidden}
  h1,h2,h3,h4,h5{font-family:'Poppins',sans-serif}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0a0f0d}::-webkit-scrollbar-thumb{background:#1e2d24;border-radius:4px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,230,118,0.25)}50%{box-shadow:0 0 40px rgba(0,230,118,0.5)}}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes typing{0%,100%{opacity:0.3}50%{opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  .fade-up{animation:fadeUp 0.7s ease forwards}
  .glow{animation:glow 2.5s ease-in-out infinite}
  .btn{font-family:'Inter',sans-serif;cursor:pointer;border:none;border-radius:10px;font-weight:600;transition:all 0.2s;font-size:14px}
  .btn-green{background:#00E676;color:#0a0f0d;padding:12px 26px}
  .btn-green:hover{background:#22C55E;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,230,118,0.3)}
  .btn-ghost{background:transparent;color:#fff;border:1.5px solid #1e2d24;padding:11px 22px}
  .btn-ghost:hover{border-color:#00E676;color:#00E676}
  .card{background:#111816;border:1px solid #1e2d24;border-radius:16px}
  .tag{display:inline-flex;align-items:center;gap:6px;background:#111816;border:1px solid #1e2d24;border-radius:20px;padding:5px 14px;font-size:11px;color:#00E676;font-weight:600;letter-spacing:0.5px;font-family:'Inter',sans-serif}
  input,textarea,select{font-family:'Inter',sans-serif;outline:none}
  input::placeholder,textarea::placeholder{color:#2d4a38}
  @media(max-width:900px){
    .nav-links{display:none!important}
    .hero-grid{grid-template-columns:1fr!important}
    .hero-chat{display:none!important}
    .features-grid{grid-template-columns:1fr 1fr!important}
    .pricing-grid{grid-template-columns:1fr!important}
    .steps-grid{grid-template-columns:1fr 1fr!important}
    .testi-grid{grid-template-columns:1fr!important}
    .prob-grid{grid-template-columns:1fr!important}
    .footer-grid{grid-template-columns:1fr 1fr!important}
    .demo-grid{grid-template-columns:1fr!important}
    .dash-layout{grid-template-columns:1fr!important}
    .dash-sidebar{display:none!important}
    .stats-row{grid-template-columns:1fr 1fr!important}
    .analytics-row{grid-template-columns:1fr!important}
    h1{font-size:34px!important}
    .section{padding:60px 20px!important}
    .nav-cta-label{display:none!important}
  }
  @media(max-width:500px){
    .features-grid{grid-template-columns:1fr!important}
    .steps-grid{grid-template-columns:1fr!important}
    .stats-row{grid-template-columns:1fr!important}
  }
`;

// ── NAV ──────────────────────────────────────────────────────────
function Nav({ view, setView }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background: scrolled ? "rgba(10,15,13,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${BORDER}` : "none", transition:"all 0.3s", padding:"0 24px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }} onClick={() => setView("landing")}>
          <div style={{ width:32, height:32, borderRadius:9, background:G, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>🤖</div>
          <span style={{ fontFamily:"Poppins,sans-serif", fontWeight:800, fontSize:19, letterSpacing:-0.5 }}>ReplyAI</span>
        </div>
        <div className="nav-links" style={{ display:"flex", gap:28, alignItems:"center" }}>
          {["Features","Pricing","How it Works","Demo"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} style={{ color:TEXT, fontSize:13, textDecoration:"none", fontWeight:500, transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color=TEXT}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button className="btn btn-ghost" style={{ padding:"8px 18px", fontSize:13 }} onClick={() => setView("dashboard")}>Dashboard</button>
          <button className="btn btn-green" style={{ padding:"9px 20px", fontSize:13 }} onClick={() => setView("setup")}>
            <span className="nav-cta-label">Start Free Trial</span><span style={{display:"none"}} className="nav-cta-icon">→</span>
          </button>
          <button onClick={() => setMenuOpen(o => !o)} style={{ display:"none", background:"transparent", border:"none", color:"white", fontSize:22, cursor:"pointer" }} className="menu-btn">☰</button>
        </div>
      </nav>
    </>
  );
}

// ── HERO ─────────────────────────────────────────────────────────
function Hero({ setView }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const msgs = [
    { from:"customer", text:"Do you have tables tonight?", time:"10:30 AM" },
    { from:"bot", text:"Yes! We have tables available at 8 PM. Would you like me to book one for you?", time:"10:30 AM" },
    { from:"customer", text:"Yes, book one for 4 people.", time:"10:31 AM" },
    { from:"bot", text:"Perfect! Your booking for 4 people at 8 PM is confirmed. See you tonight! ✅", time:"10:31 AM" },
  ];
  useEffect(() => {
    if (msgIdx < msgs.length - 1) { const t = setTimeout(() => setMsgIdx(i => i+1), 2000); return () => clearTimeout(t); }
  }, [msgIdx]);
  return (
    <section className="section" style={{ padding:"110px 32px 80px", maxWidth:1100, margin:"0 auto" }}>
      <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
        <div style={{ animation:"fadeUp 0.8s ease forwards" }}>
          <div className="tag" style={{ marginBottom:18 }}>🤖 AI Assistant For Your Business</div>
          <h1 style={{ fontSize:52, fontWeight:900, lineHeight:1.1, marginBottom:18, letterSpacing:-1.5 }}>
            Reply Instantly.<br/>
            <span style={{ color:G }}>Close More Sales.</span>
          </h1>
          <p style={{ color:TEXT, fontSize:16, lineHeight:1.75, marginBottom:28, maxWidth:430 }}>
            ReplyAI answers customer messages on WhatsApp, Instagram and websites 24/7, books appointments and turns conversations into loyal customers.
          </p>
          <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
            <button className="btn btn-green glow" style={{ fontSize:15, padding:"13px 30px" }} onClick={() => setView("setup")}>Start Free Trial</button>
            <button className="btn btn-ghost" style={{ display:"flex", alignItems:"center", gap:8 }} onClick={() => setView("demo")}>
              Watch Demo <span style={{ background:G, borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, color:DARK }}>▶</span>
            </button>
          </div>
          <div style={{ display:"flex", gap:18, flexWrap:"wrap" }}>
            {["No credit card","7-day free trial","Cancel anytime"].map(t => (
              <span key={t} style={{ display:"flex", alignItems:"center", gap:6, color:TEXT, fontSize:13 }}>
                <span style={{ color:G }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-chat" style={{ animation:"fadeUp 1s ease forwards" }}>
          <div className="card" style={{ padding:20, borderRadius:20, border:`1px solid ${BORDER}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${BORDER}` }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:G, display:"flex", alignItems:"center", justifyContent:"center", color:DARK, fontSize:16 }}>🤖</div>
              <div>
                <p style={{ fontSize:13, fontWeight:600 }}>James AI</p>
                <p style={{ fontSize:11, color:G }}>● Online</p>
              </div>
            </div>
            <div style={{ minHeight:200, display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
              {msgs.slice(0, msgIdx+1).map((m, i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.from==="customer" ? "flex-start" : "flex-end", animation:"slideIn 0.4s ease" }}>
                  {m.from==="customer" && <div style={{ width:28, height:28, borderRadius:"50%", background:"#1e2d24", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, marginRight:8, flexShrink:0 }}>👤</div>}
                  <div style={{ maxWidth:"76%", padding:"9px 13px", borderRadius: m.from==="customer" ? "14px 14px 14px 4px" : "14px 14px 4px 14px", background: m.from==="customer" ? "#1e2d24" : G, fontSize:13, lineHeight:1.5, color: m.from==="bot" ? DARK : "#c5dfd0", fontWeight: m.from==="bot" ? 500 : 400 }}>
                    {m.text}
                    <div style={{ fontSize:10, opacity:0.6, marginTop:4, textAlign:"right", color: m.from==="bot" ? DARK : TEXT }}>{m.time}</div>
                  </div>
                </div>
              ))}
              {msgIdx < msgs.length-1 && (
                <div style={{ display:"flex", gap:5, padding:"8px 12px", background:"#1e2d24", borderRadius:"14px 14px 14px 4px", width:"fit-content", marginLeft:36 }}>
                  {[0,0.2,0.4].map((d,i) => <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:G, animation:`typing 1s infinite ${d}s` }} />)}
                </div>
              )}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[["1,249","Conversations","+12.5%"],["328","Bookings","+18.3%"],["$24,350","Revenue","+25.8%"]].map(([v,l,g]) => (
                <div key={l} style={{ background:DARK, borderRadius:10, padding:"10px 11px", border:`1px solid ${BORDER}` }}>
                  <p style={{ fontFamily:"Poppins,sans-serif", fontWeight:700, fontSize:15, color:"white" }}>{v}</p>
                  <p style={{ color:TEXT, fontSize:10, marginTop:2 }}>{l}</p>
                  <p style={{ color:G, fontSize:10, marginTop:2 }}>{g} ↑</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const brands = ["Urban Grill","Luxury Salon","Travel Days","FitZone","Elite Real Estate","Bella's Spa","Spice Garden","Glow Clinic"];
  return (
    <div style={{ background:CARD, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, padding:"16px 0", overflow:"hidden" }}>
      <p style={{ textAlign:"center", color:"#2d4a38", fontSize:10, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>Trusted by businesses worldwide</p>
      <div style={{ display:"flex", animation:"marquee 24s linear infinite", width:"max-content" }}>
        {[...brands,...brands].map((b,i) => (
          <span key={i} style={{ color:TEXT, fontSize:12, fontWeight:600, padding:"0 28px", whiteSpace:"nowrap", borderRight:`1px solid ${BORDER}` }}>⬡ {b}</span>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="section" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div className="prob-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div className="card" style={{ padding:30, borderColor:"#3d1a1a" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <span style={{ fontSize:20 }}>❌</span>
            <h3 style={{ color:"#e06060", fontFamily:"Poppins,sans-serif", fontSize:20, fontWeight:700 }}>The Problem</h3>
          </div>
          {["Slow replies lose customers","Missed messages = missed sales","Staff overwhelmed with questions","No one available after hours","Inconsistent customer experience"].map(p => (
            <div key={p} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <span style={{ color:"#e06060" }}>✗</span>
              <span style={{ color:TEXT, fontSize:14 }}>{p}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:30, borderColor:G }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <span style={{ fontSize:20 }}>✅</span>
            <h3 style={{ color:G, fontFamily:"Poppins,sans-serif", fontSize:20, fontWeight:700 }}>The Solution</h3>
          </div>
          {["Instant AI replies 24/7","Never miss a customer again","More bookings & more sales","Reduce workload by 80%","Happy customers, every time"].map(s => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <span style={{ color:G }}>✓</span>
              <span style={{ color:"#c5dfd0", fontSize:14 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:"1", icon:"🌐", title:"Landing Page", desc:"Visitor lands on your website and sees ReplyAI" },
    { n:"2", icon:"👤", title:"Sign Up", desc:"User creates an account in under 2 minutes" },
    { n:"3", icon:"🔗", title:"Onboarding", desc:"Connect channels & set up your AI assistant" },
    { n:"4", icon:"📊", title:"Dashboard", desc:"Manage chats, bookings & leads in one place" },
    { n:"5", icon:"🤖", title:"AI Responds", desc:"James AI replies to customers instantly" },
    { n:"6", icon:"🎯", title:"Customer", desc:"Gets help & books or takes action" },
  ];
  return (
    <section id="how-it-works" className="section" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div className="tag" style={{ marginBottom:12 }}>User Flow</div>
        <h2 style={{ fontSize:36, fontWeight:800, letterSpacing:-0.5 }}>How <span style={{ color:G }}>ReplyAI</span> Works</h2>
      </div>
      <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", position:"relative" }}>
            {i < steps.length-1 && <div style={{ position:"absolute", top:26, left:"58%", width:"80%", height:1, background:BORDER, zIndex:0 }} />}
            <div style={{ width:52, height:52, borderRadius:"50%", background:CARD, border:`2px solid ${G}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:12, zIndex:1 }}>{s.icon}</div>
            <div style={{ background:G, color:DARK, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:10, marginBottom:8 }}>{s.n}</div>
            <h4 style={{ fontFamily:"Poppins,sans-serif", fontSize:13, marginBottom:6, fontWeight:600 }}>{s.title}</h4>
            <p style={{ color:TEXT, fontSize:11, lineHeight:1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon:"🤖", title:"AI Replies 24/7", desc:"Instant answers to never miss a customer" },
    { icon:"🔗", title:"Multi-Channel", desc:"WhatsApp, Instagram, Website & more" },
    { icon:"📅", title:"Smart Booking", desc:"Book appointments automatically" },
    { icon:"📊", title:"Analytics", desc:"Track conversations and grow revenue" },
    { icon:"🌍", title:"Multi-Language", desc:"Speak your customer's language" },
    { icon:"⚡", title:"Quick Replies", desc:"Templates for common questions" },
  ];
  return (
    <section id="features" className="section" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div className="tag" style={{ marginBottom:12 }}>Features</div>
        <h2 style={{ fontSize:36, fontWeight:800, letterSpacing:-0.5 }}>What Can <span style={{ color:G }}>ReplyAI</span> Do?</h2>
      </div>
      <div className="features-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {feats.map(f => (
          <div key={f.title} className="card" style={{ padding:24, borderRadius:14, transition:"all 0.2s", cursor:"default" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=G;e.currentTarget.style.transform="translateY(-4px)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=BORDER;e.currentTarget.style.transform="translateY(0)"}}>
            <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
            <h4 style={{ fontFamily:"Poppins,sans-serif", fontSize:15, marginBottom:7, fontWeight:600 }}>{f.title}</h4>
            <p style={{ color:TEXT, fontSize:13, lineHeight:1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing({ setView, setPlan }) {
  const plans = [
    { name:"Starter", price:29, desc:"Perfect for small businesses", features:["1 AI Assistant","WhatsApp + Website","Basic Analytics","100 Conversations/mo","Email support"] },
    { name:"Pro", price:79, desc:"Best for growing businesses", popular:true, features:["2 AI Assistants","All Channels","Advanced Analytics","500 Conversations/mo","Urgent owner alerts","Priority support"] },
    { name:"Business", price:199, desc:"For large businesses", features:["5 AI Assistants","All Channels","Premium Analytics","Unlimited Conversations","Booking management","Dedicated onboarding"] },
  ];
  return (
    <section id="pricing" className="section" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div className="tag" style={{ marginBottom:12 }}>Pricing</div>
        <h2 style={{ fontSize:36, fontWeight:800, letterSpacing:-0.5 }}>Simple, Transparent Pricing</h2>
        <p style={{ color:TEXT, marginTop:10, fontSize:14 }}>14-day free trial · No credit card needed · Cancel anytime</p>
      </div>
      <div className="pricing-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ background:CARD, border:`1.5px solid ${plan.popular ? G : BORDER}`, borderRadius:20, padding:26, position:"relative", display:"flex", flexDirection:"column", transition:"transform 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            {plan.popular && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:G, color:DARK, fontSize:10, fontWeight:700, padding:"4px 14px", borderRadius:20, whiteSpace:"nowrap" }}>Most Popular</div>}
            <p style={{ color:TEXT, fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:0.5, marginBottom:4 }}>{plan.name}</p>
            <p style={{ color:"#2d4a38", fontSize:12, marginBottom:14 }}>{plan.desc}</p>
            <div style={{ display:"flex", alignItems:"baseline", gap:3, marginBottom:22 }}>
              <span style={{ fontFamily:"Poppins,sans-serif", fontSize:42, fontWeight:800 }}>${plan.price}</span>
              <span style={{ color:TEXT, fontSize:13 }}>/mo</span>
            </div>
            <div style={{ flex:1, marginBottom:22 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display:"flex", gap:9, marginBottom:10, alignItems:"flex-start" }}>
                  <span style={{ color:G, flexShrink:0, marginTop:1 }}>✓</span>
                  <span style={{ color:"#c5dfd0", fontSize:13 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setPlan(plan); setView("setup"); }}
              style={{ width:"100%", padding:"12px", borderRadius:11, border: plan.popular ? "none" : `1.5px solid ${BORDER}`, background: plan.popular ? G : "transparent", color: plan.popular ? DARK : G, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.2s" }}>
              Start Free Trial
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name:"Ahmed R.", role:"Restaurant Owner", text:"ReplyAI transformed how we talk to customers. We never miss a booking anymore!", stars:5 },
    { name:"Sara M.", role:"Salon Owner", text:"Our response time improved by 90%. More happy customers and more sales!", stars:5 },
    { name:"James T.", role:"Travel Agency", text:"The AI handles most questions so my team can focus on important tasks.", stars:5 },
    { name:"Lina K.", role:"E-commerce", text:"Best investment for our business. Setting up was so easy and fast.", stars:5 },
  ];
  return (
    <section className="section" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div className="tag" style={{ marginBottom:12 }}>Testimonials</div>
        <h2 style={{ fontSize:36, fontWeight:800, letterSpacing:-0.5 }}>Trusted by Business Owners</h2>
      </div>
      <div className="testi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {t.map(item => (
          <div key={item.name} className="card" style={{ padding:24, borderRadius:16 }}>
            <div style={{ color:"#f0c040", fontSize:14, marginBottom:10 }}>{"★".repeat(item.stars)}</div>
            <p style={{ color:"#c5dfd0", fontSize:14, lineHeight:1.7, marginBottom:14, fontStyle:"italic" }}>"{item.text}"</p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"#1e2d24", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👤</div>
              <div>
                <p style={{ fontWeight:600, fontSize:13 }}>{item.name}</p>
                <p style={{ color:TEXT, fontSize:12 }}>{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA({ setView }) {
  return (
    <section className="section" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ background:`linear-gradient(135deg, #0d1a12 0%, #0a2518 100%)`, border:`1.5px solid ${G}`, borderRadius:24, padding:"56px 40px", textAlign:"center" }}>
        <h2 style={{ fontSize:36, fontWeight:800, marginBottom:14, letterSpacing:-0.5 }}>Ready to Grow Your Business?</h2>
        <p style={{ color:TEXT, fontSize:15, marginBottom:30, maxWidth:460, margin:"0 auto 30px" }}>Join 100+ businesses using ReplyAI to save time, increase sales and delight customers.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn btn-green glow" style={{ fontSize:15, padding:"13px 34px" }} onClick={() => setView("setup")}>Start Free Trial</button>
          <button className="btn btn-ghost" onClick={() => setView("demo")}>Watch Demo ▶</button>
        </div>
      </div>
    </section>
  );
}

function Footer({ setView }) {
  return (
    <footer style={{ background:DARK, borderTop:`1px solid ${BORDER}`, padding:"48px 32px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36, marginBottom:36 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, cursor:"pointer" }} onClick={() => setView("landing")}>
              <div style={{ width:30, height:30, borderRadius:8, background:G, display:"flex", alignItems:"center", justifyContent:"center" }}>🤖</div>
              <span style={{ fontFamily:"Poppins,sans-serif", fontWeight:800, fontSize:17 }}>ReplyAI</span>
            </div>
            <p style={{ color:TEXT, fontSize:13, lineHeight:1.7, maxWidth:220 }}>Your 24/7 AI assistant for customer conversations and business growth.</p>
          </div>
          {[
            { title:"Product", links:["Features","Pricing","Demo","Roadmap"] },
            { title:"Company", links:["About Us","Blog","Careers","Contact"] },
            { title:"Legal", links:["Terms of Service","Privacy Policy","Refund Policy"] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontWeight:700, marginBottom:14, fontFamily:"Poppins,sans-serif", fontSize:13 }}>{col.title}</p>
              {col.links.map(l => <p key={l} style={{ color:TEXT, fontSize:13, marginBottom:9, cursor:"pointer" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:18, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <p style={{ color:"#2d4a38", fontSize:12 }}>© 2025 ReplyAI. All rights reserved.</p>
          <p style={{ color:"#2d4a38", fontSize:12 }}>Made with 💚 for businesses worldwide</p>
        </div>
      </div>
    </footer>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────
function Dashboard({ setView }) {
  const [activeTab, setActiveTab] = useState("overview");
  const navItems = [
    { id:"overview", icon:"📊", label:"Overview" },
    { id:"conversations", icon:"💬", label:"Conversations" },
    { id:"contacts", icon:"👥", label:"Contacts" },
    { id:"bookings", icon:"📅", label:"Bookings" },
    { id:"analytics", icon:"📈", label:"Analytics" },
    { id:"settings", icon:"⚙️", label:"AI Settings" },
  ];
  const convos = [
    { channel:"💬", name:"WhatsApp", msg:"Customer: Do you have tables tonight?", time:"10:30 AM", status:"Replied", color:"#25D366" },
    { channel:"📸", name:"Instagram", msg:"Customer: How much is the price?", time:"10:28 AM", status:"Replied", color:"#E1306C" },
    { channel:"🌐", name:"Website Chat", msg:"Customer: I want to book a service", time:"10:15 AM", status:"Replied", color:G },
    { channel:"💬", name:"WhatsApp", msg:"Customer: Is delivery available?", time:"10:05 AM", status:"Replied", color:"#25D366" },
  ];
  return (
    <div style={{ minHeight:"100vh", background:DARK, display:"flex", flexDirection:"column" }}>
      <div style={{ background:CARD, borderBottom:`1px solid ${BORDER}`, padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }} onClick={() => setView("landing")}>
          <div style={{ width:28, height:28, borderRadius:7, background:G, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🤖</div>
          <span style={{ fontFamily:"Poppins,sans-serif", fontWeight:800, fontSize:16 }}>ReplyAI</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ color:TEXT, fontSize:12 }}>May 12 – May 18, 2025</span>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#1e2d24", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🔔</div>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#1e2d24", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>⚙️</div>
          <div style={{ width:32, height:32, borderRadius:"50%", background:G, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>👤</div>
        </div>
      </div>

      <div className="dash-layout" style={{ display:"grid", gridTemplateColumns:"220px 1fr", flex:1, minHeight:"calc(100vh - 56px)" }}>
        <aside className="dash-sidebar" style={{ background:CARD, borderRight:`1px solid ${BORDER}`, padding:"20px 0", display:"flex", flexDirection:"column" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 20px", background: activeTab===item.id ? "#1e2d24" : "transparent", border:"none", color: activeTab===item.id ? G : TEXT, fontSize:13, fontWeight: activeTab===item.id ? 600 : 400, cursor:"pointer", textAlign:"left", borderLeft: activeTab===item.id ? `3px solid ${G}` : "3px solid transparent", transition:"all 0.15s", fontFamily:"Inter,sans-serif" }}>
              <span style={{ fontSize:16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
          <div style={{ marginTop:"auto", padding:"16px 20px" }}>
            <div style={{ background:"#0d1a12", border:`1px solid ${G}`, borderRadius:12, padding:"14px", textAlign:"center" }}>
              <p style={{ color:G, fontSize:12, fontWeight:600, marginBottom:4 }}>Upgrade Plan</p>
              <p style={{ color:TEXT, fontSize:11, marginBottom:10 }}>Unlock all features</p>
              <button className="btn btn-green" style={{ width:"100%", padding:"8px", fontSize:12 }}>Upgrade →</button>
            </div>
          </div>
        </aside>

        <main style={{ padding:24, overflowY:"auto" }}>
          {activeTab === "overview" && (
            <div>
              <div style={{ marginBottom:20 }}>
                <h2 style={{ fontFamily:"Poppins,sans-serif", fontSize:20, fontWeight:700, marginBottom:4 }}>Overview</h2>
                <p style={{ color:TEXT, fontSize:13 }}>Welcome back! Here's what's happening today.</p>
              </div>
              <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
                {[["Total Conversations","1,249","+12.5% this week","💬"],["Bookings","328","+18.3% this week","📅"],["Revenue","$24,350","+25.8% this week","💰"],["New Leads","892","+15.1% this week","🎯"]].map(([l,v,g,icon]) => (
                  <div key={l} className="card" style={{ padding:18, borderRadius:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <p style={{ color:TEXT, fontSize:11, fontWeight:500 }}>{l}</p>
                      <span style={{ fontSize:18 }}>{icon}</span>
                    </div>
                    <p style={{ fontFamily:"Poppins,sans-serif", fontSize:24, fontWeight:800, marginBottom:4 }}>{v}</p>
                    <p style={{ color:G, fontSize:11 }}>{g}</p>
                  </div>
                ))}
              </div>

              <div className="analytics-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
                <div className="card" style={{ padding:20, borderRadius:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                    <h3 style={{ fontFamily:"Poppins,sans-serif", fontSize:14, fontWeight:600 }}>Conversations</h3>
                    <span style={{ color:TEXT, fontSize:11 }}>All Channels</span>
                  </div>
                  {convos.map((c, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom: i < convos.length-1 ? `1px solid ${BORDER}` : "none" }}>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:"#1e2d24", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{c.channel}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:12, fontWeight:600, marginBottom:2 }}>{c.name}</p>
                        <p style={{ fontSize:11, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.msg}</p>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <p style={{ fontSize:10, color:TEXT, marginBottom:4 }}>{c.time}</p>
                        <span style={{ background:"#0d2d1a", color:G, fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:8 }}>{c.status}</span>
                      </div>
                    </div>
                  ))}
                  <button style={{ width:"100%", marginTop:14, padding:"9px", borderRadius:9, border:`1px solid ${BORDER}`, background:"transparent", color:TEXT, fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>View all conversations →</button>
                </div>

                <div className="card" style={{ padding:20, borderRadius:14 }}>
                  <h3 style={{ fontFamily:"Poppins,sans-serif", fontSize:14, fontWeight:600, marginBottom:16 }}>Analytics Overview <span style={{ color:TEXT, fontSize:11, fontWeight:400 }}>(This Week)</span></h3>
                  <div style={{ height:120, display:"flex", alignItems:"flex-end", gap:6, marginBottom:16 }}>
                    {[60,80,45,90,70,85,95].map((h,i) => (
                      <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                        <div style={{ width:"100%", height:`${h}%`, background:`linear-gradient(to top, ${G}, ${G}44)`, borderRadius:"4px 4px 0 0", transition:"height 0.3s" }} />
                        <span style={{ color:TEXT, fontSize:9 }}>{["M","T","W","T","F","S","S"][i]}</span>
                      </div>
                    ))}
                  </div>
                  <h3 style={{ fontFamily:"Poppins,sans-serif", fontSize:13, fontWeight:600, marginBottom:12 }}>Top Channels</h3>
                  {[["WhatsApp","65%","#25D366"],["Instagram","20%","#E1306C"],["Website Chat","10%",G],["Other","5%","#6b7280"]].map(([name,pct,color]) => (
                    <div key={name} style={{ marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:12, color:TEXT }}>{name}</span>
                        <span style={{ fontSize:12, color:"white", fontWeight:600 }}>{pct}</span>
                      </div>
                      <div style={{ height:5, background:BORDER, borderRadius:4 }}>
                        <div style={{ width:pct, height:"100%", background:color, borderRadius:4 }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:38, height:38, borderRadius:"50%", background:"#1e2d24", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤖</div>
                    <div>
                      <p style={{ fontSize:12, fontWeight:600 }}>James AI</p>
                      <p style={{ fontSize:11, color:TEXT }}>Business Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "conversations" && (
            <div>
              <h2 style={{ fontFamily:"Poppins,sans-serif", fontSize:20, fontWeight:700, marginBottom:20 }}>💬 Conversations</h2>
              {convos.map((c, i) => (
                <div key={i} className="card" style={{ padding:18, marginBottom:12, borderRadius:14, display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:c.color+"22", border:`2px solid ${c.color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{c.channel}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <p style={{ fontWeight:600, fontSize:14 }}>{c.name}</p>
                      <p style={{ color:TEXT, fontSize:12 }}>{c.time}</p>
                    </div>
                    <p style={{ color:TEXT, fontSize:13 }}>{c.msg}</p>
                  </div>
                  <span style={{ background:"#0d2d1a", color:G, fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:10, flexShrink:0 }}>{c.status}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "analytics" && (
            <div>
              <h2 style={{ fontFamily:"Poppins,sans-serif", fontSize:20, fontWeight:700, marginBottom:20 }}>📈 Analytics</h2>
              <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
                {[["Messages Sent","4,821","↑ 22%","📤"],["Avg Response","1.2s","↓ 0.3s","⚡"],["Satisfaction","98%","↑ 3%","😊"],["Bookings Made","328","↑ 18%","📅"]].map(([l,v,g,icon]) => (
                  <div key={l} className="card" style={{ padding:18, borderRadius:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <p style={{ color:TEXT, fontSize:11 }}>{l}</p>
                      <span style={{ fontSize:18 }}>{icon}</span>
                    </div>
                    <p style={{ fontFamily:"Poppins,sans-serif", fontSize:24, fontWeight:800, marginBottom:4 }}>{v}</p>
                    <p style={{ color:G, fontSize:11 }}>{g}</p>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding:24, borderRadius:14 }}>
                <h3 style={{ fontFamily:"Poppins,sans-serif", fontSize:14, fontWeight:600, marginBottom:16 }}>Weekly Performance</h3>
                <div style={{ height:160, display:"flex", alignItems:"flex-end", gap:8 }}>
                  {[55,75,40,88,65,80,92].map((h,i) => (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                      <span style={{ color:TEXT, fontSize:10 }}>{h}%</span>
                      <div style={{ width:"100%", height:`${h*1.4}px`, background:`linear-gradient(to top, ${G}, ${G}44)`, borderRadius:"6px 6px 0 0" }} />
                      <span style={{ color:TEXT, fontSize:10 }}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeTab === "contacts" || activeTab === "bookings" || activeTab === "settings") && (
            <div style={{ textAlign:"center", paddingTop:60 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>{navItems.find(n=>n.id===activeTab)?.icon}</div>
              <h2 style={{ fontFamily:"Poppins,sans-serif", fontSize:22, fontWeight:700, marginBottom:10 }}>{navItems.find(n=>n.id===activeTab)?.label}</h2>
              <p style={{ color:TEXT, fontSize:14, marginBottom:28 }}>This section is coming soon in the next update!</p>
              <button className="btn btn-green" onClick={() => setActiveTab("overview")}>← Back to Overview</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ── SETUP ────────────────────────────────────────────────────────
function SetupPage({ plan, setView }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ businessName:"", ownerName:"", phone:"", hours:"Mon-Sat 9am-6pm", services:"", faqs:"", urgentPhone:"" });
  const steps = [
    { title:"Business Info", emoji:"🏪", fields:[{key:"businessName",label:"Business Name",ph:"e.g. Bella's Salon"},{key:"ownerName",label:"Your Name",ph:"e.g. Sarah Ahmed"},{key:"phone",label:"Phone / WhatsApp",ph:"+971 50 000 0000"}]},
    { title:"What You Offer", emoji:"💼", fields:[{key:"hours",label:"Opening Hours",ph:"Mon-Sat 9am-6pm"},{key:"services",label:"Services & Prices",ph:"Haircut $30, Colour $80...",multi:true},{key:"faqs",label:"FAQs",ph:"Do you accept walk-ins? Yes!",multi:true}]},
    { title:"Go Live 🚀", emoji:"🎯", fields:[{key:"urgentPhone",label:"Urgent Alert Phone",ph:"+971 50 000 0000"}]},
  ];
  if(done) return (
    <div style={{minHeight:"100vh",background:DARK,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="card" style={{padding:40,maxWidth:440,width:"100%",textAlign:"center",borderRadius:24}}>
        <div style={{fontSize:52,marginBottom:16}}>🎉</div>
        <h2 style={{fontFamily:"Poppins,sans-serif",fontSize:24,fontWeight:800,marginBottom:8}}>James is Live!</h2>
        <p style={{color:TEXT,marginBottom:28,fontSize:14}}>Your AI assistant is ready for {form.businessName||"your business"}.</p>
        <div style={{display:"flex",gap:10}}>
          <button className="btn btn-green" style={{flex:1}} onClick={()=>setView("demo")}>Try James 🤖</button>
          <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setView("dashboard")}>Dashboard →</button>
        </div>
      </div>
    </div>
  );
  const cur = steps[step];
  return (
    <div style={{minHeight:"100vh",background:DARK,display:"flex",alignItems:"center",justifyContent:"center",padding:20,paddingTop:80}}>
      <div style={{maxWidth:480,width:"100%"}}>
        <button className="btn btn-ghost" style={{marginBottom:20,fontSize:13,padding:"7px 16px"}} onClick={()=>setView("landing")}>← Back</button>
        <div style={{display:"flex",gap:6,marginBottom:24}}>
          {steps.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<=step?G:BORDER,transition:"background 0.3s"}}/>)}
        </div>
        <div className="card" style={{padding:"30px 26px",borderRadius:20}}>
          <p style={{color:G,fontSize:11,fontWeight:700,marginBottom:4}}>{plan?.name||"Starter"} Plan · Step {step+1} of {steps.length}</p>
          <h2 style={{fontFamily:"Poppins,sans-serif",fontSize:21,fontWeight:800,marginBottom:22}}>{cur.emoji} {cur.title}</h2>
          {cur.fields.map(f=>(
            <div key={f.key} style={{marginBottom:16}}>
              <label style={{display:"block",color:TEXT,fontSize:12,fontWeight:500,marginBottom:6}}>{f.label}</label>
              {f.multi?<textarea value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.ph} rows={3} style={{width:"100%",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${BORDER}`,background:DARK,color:"white",fontSize:13,resize:"vertical",fontFamily:"inherit"}}/>
              :<input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.ph} style={{width:"100%",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${BORDER}`,background:DARK,color:"white",fontSize:13}}/>}
            </div>
          ))}
          <div style={{display:"flex",gap:10,marginTop:22}}>
            {step>0&&<button className="btn btn-ghost" style={{flex:1}} onClick={()=>setStep(s=>s-1)}>← Back</button>}
            <button className="btn btn-green" style={{flex:2}} onClick={()=>step<steps.length-1?setStep(s=>s+1):setDone(true)}>
              {step<steps.length-1?"Continue →":"🚀 Launch James!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DEMO ────────────────────────────────────────────────────────
function DemoPage({ setView }) {
  const [msgs,setMsgs]=useState([{role:"assistant",text:"Hey! 👋 I'm James, your AI assistant for Bella's Salon. I'm here 24/7 — how can I help you today?"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"})},[msgs,loading]);
  const send=async(text)=>{
    const msg=(text||input).trim();
    if(!msg||loading)return;
    setInput("");
    const history=[...msgs,{role:"user",text:msg}];
    setMsgs(history);
    setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`You are James, a warm and professional AI assistant for "Bella's Salon" in Dubai.\nBusiness: Bella's Salon, 14 Marina Walk, Dubai Marina\nOwner: Sarah | Phone: +971-50-123-4567\nHours: Mon-Sat 9am-7pm | Sun 11am-5pm\nServices: Women's haircut $30, Men's $20, Blow dry $25, Full colour $90, Highlights $70, Keratin $120, Manicure $25, Pedicure $35\nStyle: warm, friendly, concise 2-3 sentences. If urgent say you are alerting Sarah now, she responds within 30 minutes.`,messages:history.map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text}))})});
      const data=await res.json();
      setMsgs(prev=>[...prev,{role:"assistant",text:data.content?.[0]?.text||"Let me get that for you!"}]);
    }catch{setMsgs(prev=>[...prev,{role:"assistant",text:"Sorry, had a hiccup! Please try again."}]);}
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:DARK,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 16px",paddingTop:80}}>
      <div style={{maxWidth:500,width:"100%"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <h2 style={{fontFamily:"Poppins,sans-serif",fontSize:19,fontWeight:800,marginBottom:2}}>Talk to James — Live AI</h2>
            <p style={{color:TEXT,fontSize:12}}>Powered by real AI · Ask anything a customer would</p>
          </div>
          <button className="btn btn-ghost" style={{fontSize:12,padding:"7px 14px"}} onClick={()=>setView("landing")}>← Back</button>
        </div>
        <div className="card" style={{overflow:"hidden",borderRadius:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"13px 16px",borderBottom:`1px solid ${BORDER}`}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,color:DARK}}>🤖</div>
            <div><p style={{fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:700}}>James</p><p style={{fontSize:11,color:G}}>● Online · Bella's Salon</p></div>
          </div>
          <div style={{height:320,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"slideIn 0.3s ease"}}>
                <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?G:"#1e2d24",color:m.role==="user"?DARK:"#c5dfd0",fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap",fontWeight:m.role==="user"?500:400}}>{m.text}</div>
              </div>
            ))}
            {loading&&<div style={{display:"flex",gap:5,padding:"10px 14px",background:"#1e2d24",borderRadius:"16px 16px 16px 4px",width:"fit-content"}}>{[0,0.2,0.4].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:G,animation:`typing 1s infinite ${d}s`}}/>)}</div>}
            <div ref={bottomRef}/>
          </div>
          <div style={{padding:"8px 12px 6px",borderTop:`1px solid ${BORDER}`,display:"flex",flexWrap:"wrap",gap:6}}>
            {["What are your prices?","Are you open Sunday?","I want to book","This is urgent!"].map(q=>(
              <button key={q} onClick={()=>send(q)} style={{fontSize:11,padding:"5px 11px",borderRadius:16,border:`1px solid ${BORDER}`,background:"transparent",color:TEXT,cursor:"pointer",fontFamily:"inherit"}}>{q}</button>
            ))}
          </div>
          <div style={{padding:"10px 12px",borderTop:`1px solid ${BORDER}`,display:"flex",gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type your message to James..." style={{flex:1,padding:"10px 14px",borderRadius:24,border:`1.5px solid ${BORDER}`,background:DARK,color:"white",fontSize:13}}/>
            <button onClick={()=>send()} style={{width:40,height:40,borderRadius:"50%",border:"none",background:G,color:DARK,cursor:"pointer",fontSize:17,flexShrink:0,fontWeight:700}}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing");
  const [plan, setPlan] = useState(null);
  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:DARK, minHeight:"100vh" }}>
      <style>{css}</style>
      {view === "landing" && (
        <>
          <Nav view={view} setView={setView} />
          <Hero setView={setView} />
          <Marquee />
          <Problem />
          <HowItWorks />
          <Features />
          <Pricing setView={setView} setPlan={setPlan} />
          <Testimonials />
          <CTA setView={setView} />
          <Footer setView={setView} />
        </>
      )}
      {view === "dashboard" && <Dashboard setView={setView} />}
      {view === "setup" && <SetupPage plan={plan} setView={setView} />}
      {view === "demo" && <DemoPage setView={setView} />}
    </div>
  );
}
