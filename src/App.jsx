import { useState, useEffect, useRef } from "react";

const G = "#0ea371";
const GD = "#0b7d58";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #060d09; color: #fff; overflow-x: hidden; }
  h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #060d09; } ::-webkit-scrollbar-thumb { background: #1a3522; border-radius: 4px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(14,163,113,0.3)} 50%{box-shadow:0 0 40px rgba(14,163,113,0.6)} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes typing { 0%,100%{opacity:0.3} 50%{opacity:1} }
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .glow { animation: glow 2s ease-in-out infinite; }
  .btn-primary { background: #0ea371; color: #fff; border: none; border-radius: 10px; padding: 13px 28px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .btn-primary:hover { background: #0b7d58; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(14,163,113,0.35); }
  .btn-outline { background: transparent; color: #fff; border: 1.5px solid #1a3522; border-radius: 10px; padding: 12px 24px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .btn-outline:hover { border-color: #0ea371; color: #0ea371; }
  .card { background: #0d1a12; border: 1px solid #1a3522; border-radius: 18px; }
  .tag { display:inline-flex; align-items:center; gap:6px; background:#0d1a12; border:1px solid #1a3522; border-radius:20px; padding:5px 14px; font-size:12px; color:#0ea371; font-weight:600; letter-spacing:0.5px; }
  @media(max-width:768px){
    .nav-links{display:none!important}
    .hero-grid{grid-template-columns:1fr!important}
    .features-grid{grid-template-columns:1fr 1fr!important}
    .pricing-grid{grid-template-columns:1fr!important}
    .steps-grid{grid-template-columns:1fr 1fr!important}
    .testimonials-grid{grid-template-columns:1fr!important}
    .problem-grid{grid-template-columns:1fr!important}
    .footer-grid{grid-template-columns:1fr 1fr!important}
    .demo-grid{grid-template-columns:1fr!important}
    .cta-btns{flex-direction:column!important;align-items:center!important}
    h1{font-size:36px!important}
    .hero-section{padding:40px 20px 60px!important}
  }
`;

function Nav({ setView }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background: scrolled ? "rgba(6,13,9,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #1a3522" : "none", transition:"all 0.3s", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:34, height:34, borderRadius:10, background:G, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤖</div>
        <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:20, letterSpacing:-0.5 }}>ReplyAI</span>
      </div>
      <div className="nav-links" style={{ display:"flex", gap:32, alignItems:"center" }}>
        {["Features","How it Works","Pricing","Roadmap","Demo"].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} style={{ color:"#8ab09a", fontSize:14, textDecoration:"none", fontWeight:500, transition:"color 0.2s" }}
            onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#8ab09a"}>{l}</a>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button className="btn-outline" style={{ padding:"8px 20px", fontSize:14 }}>Log in</button>
        <button className="btn-primary" style={{ padding:"8px 20px", fontSize:14 }} onClick={() => setView("setup")}>Start Free Trial</button>
      </div>
    </nav>
  );
}

function Hero({ setView }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const msgs = [
    { from:"customer", text:"Do you deliver to Abu Dhabi?", time:"10:30 AM" },
    { from:"bot", text:"Yes! We deliver to Abu Dhabi within 24 hours. Would you like to place an order?", time:"10:30 AM" },
    { from:"customer", text:"Yes, please send the menu.", time:"10:31 AM" },
    { from:"bot", text:"Perfect! Here's our menu 📋 What would you like to order?", time:"10:31 AM" },
  ];
  useEffect(() => {
    if (msgIdx < msgs.length - 1) {
      const t = setTimeout(() => setMsgIdx(i => i + 1), 1800);
      return () => clearTimeout(t);
    }
  }, [msgIdx]);
  return (
    <section className="hero-section" style={{ padding:"120px 32px 80px", maxWidth:1100, margin:"0 auto" }}>
      <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
        <div style={{ animation:"fadeUp 0.8s ease forwards" }}>
          <div className="tag" style={{ marginBottom:20 }}>🤖 AI Assistant for Businesses</div>
          <h1 style={{ fontSize:54, fontWeight:800, lineHeight:1.1, marginBottom:20, letterSpacing:-1 }}>
            Reply Instantly.<br />
            <span style={{ color:G }}>Close More Sales.</span>
          </h1>
          <p style={{ color:"#8ab09a", fontSize:17, lineHeight:1.7, marginBottom:32, maxWidth:440 }}>
            ReplyAI is your 24/7 AI assistant for WhatsApp, Instagram, and Websites. Answer questions, book appointments, and turn conversations into customers — automatically.
          </p>
          <div className="cta-btns" style={{ display:"flex", gap:14, marginBottom:28, flexWrap:"wrap" }}>
            <button className="btn-primary glow" style={{ fontSize:16, padding:"14px 32px" }} onClick={() => setView("setup")}>Start Free Trial</button>
            <button className="btn-outline" style={{ display:"flex", alignItems:"center", gap:8 }} onClick={() => setView("demo")}>
              Watch Demo <span style={{ background:G, borderRadius:"50%", width:24, height:24, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>▶</span>
            </button>
          </div>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            {["No credit card","7-day free trial","Cancel anytime"].map(t => (
              <span key={t} style={{ display:"flex", alignItems:"center", gap:6, color:"#8ab09a", fontSize:13 }}>
                <span style={{ color:G }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ animation:"fadeUp 1s ease forwards" }}>
          <div className="card" style={{ padding:22, borderRadius:22 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingBottom:14, borderBottom:"1px solid #1a3522" }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:G, display:"flex", alignItems:"center", justifyContent:"center" }}>🤖</div>
              <div>
                <p style={{ fontSize:14, fontWeight:600 }}>Live Chat</p>
                <p style={{ fontSize:11, color:G }}>● James is online</p>
              </div>
            </div>
            <div style={{ minHeight:190, display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
              {msgs.slice(0, msgIdx+1).map((m, i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.from==="customer" ? "flex-start" : "flex-end", animation:"fadeUp 0.4s ease" }}>
                  <div style={{ maxWidth:"78%", padding:"9px 13px", borderRadius: m.from==="customer" ? "14px 14px 14px 4px" : "14px 14px 4px 14px", background: m.from==="customer" ? "#1a3522" : G, fontSize:13, lineHeight:1.5, color: m.from==="bot" ? "white" : "#c5dfd0" }}>
                    {m.text}
                    <div style={{ fontSize:10, opacity:0.6, marginTop:4, textAlign:"right" }}>{m.time}</div>
                  </div>
                </div>
              ))}
              {msgIdx < msgs.length - 1 && (
                <div style={{ display:"flex", gap:5, padding:"8px 12px", background:"#1a3522", borderRadius:"14px 14px 14px 4px", width:"fit-content" }}>
                  {[0,0.2,0.4].map((d,i) => <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:G, animation:`typing 1s infinite ${d}s` }} />)}
                </div>
              )}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[["Conversations","1,249","+12.5%"],["Bookings","328","+18.3%"],["Revenue","$24,350","+21.8%"]].map(([l,v,g]) => (
                <div key={l} style={{ background:"#060d09", borderRadius:12, padding:"10px 12px", border:"1px solid #1a3522" }}>
                  <p style={{ color:"#8ab09a", fontSize:10, marginBottom:4 }}>{l}</p>
                  <p style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:15, color:"white" }}>{v}</p>
                  <p style={{ color:G, fontSize:11 }}>{g} this week</p>
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
    <div style={{ background:"#0d1a12", borderTop:"1px solid #1a3522", borderBottom:"1px solid #1a3522", padding:"18px 0", overflow:"hidden" }}>
      <p style={{ textAlign:"center", color:"#3d6b52", fontSize:11, fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>Trusted by 100+ businesses</p>
      <div style={{ display:"flex", animation:"marquee 22s linear infinite", width:"max-content" }}>
        {[...brands,...brands].map((b,i) => (
          <span key={i} style={{ color:"#8ab09a", fontSize:13, fontWeight:600, padding:"0 32px", whiteSpace:"nowrap", borderRight:"1px solid #1a3522" }}>⬡ {b}</span>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section id="features" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div className="problem-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div className="card" style={{ padding:32, borderColor:"#3d1a1a" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
            <span style={{ fontSize:22 }}>❌</span>
            <h3 style={{ color:"#e06060", fontFamily:"Syne,sans-serif", fontSize:22 }}>The Problem</h3>
          </div>
          {["Slow replies lose customers","Missed messages = missed sales","Staff overwhelmed with questions","No one available after hours","Inconsistent customer experience"].map(p => (
            <div key={p} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:13 }}>
              <span style={{ color:"#e06060", fontSize:16 }}>✗</span>
              <span style={{ color:"#8ab09a", fontSize:15 }}>{p}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:32, borderColor:G }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
            <span style={{ fontSize:22 }}>✅</span>
            <h3 style={{ color:G, fontFamily:"Syne,sans-serif", fontSize:22 }}>The Solution</h3>
          </div>
          {["Instant AI replies 24/7","Never miss a customer again","More bookings & more sales","Reduce workload by 80%","Happy customers, every time"].map(s => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:13 }}>
              <span style={{ color:G, fontSize:16 }}>✓</span>
              <span style={{ color:"#c5dfd0", fontSize:15 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:"1", icon:"🔗", title:"Connect", desc:"Connect your WhatsApp, Instagram or Website in minutes" },
    { n:"2", icon:"🤖", title:"Train", desc:"Train James with your business info, prices and FAQs" },
    { n:"3", icon:"⚡", title:"Automate", desc:"James replies instantly and handles all conversations" },
    { n:"4", icon:"📈", title:"Grow", desc:"Get more leads, bookings and happy customers" },
  ];
  return (
    <section id="how-it-works" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div className="tag" style={{ marginBottom:14 }}>How It Works</div>
        <h2 style={{ fontSize:38, fontWeight:800, letterSpacing:-0.5 }}>How <span style={{ color:G }}>ReplyAI</span> Works</h2>
      </div>
      <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", position:"relative" }}>
            {i < steps.length-1 && <div style={{ position:"absolute", top:27, left:"58%", width:"84%", height:1, background:"#1a3522", zIndex:0 }} />}
            <div style={{ width:56, height:56, borderRadius:"50%", background:"#0d1a12", border:`2px solid ${G}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:14, zIndex:1 }}>{s.icon}</div>
            <div style={{ background:G, color:"white", fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:10, marginBottom:10 }}>{s.n}</div>
            <h4 style={{ fontFamily:"Syne,sans-serif", fontSize:16, marginBottom:8 }}>{s.title}</h4>
            <p style={{ color:"#8ab09a", fontSize:13, lineHeight:1.6 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LiveDemo({ setView }) {
  return (
    <section id="demo" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div className="card demo-grid" style={{ padding:40, borderRadius:24, display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
        <div>
          <div className="tag" style={{ marginBottom:14 }}>Live Demo</div>
          <h2 style={{ fontSize:34, fontWeight:800, marginBottom:16, letterSpacing:-0.5 }}>See ReplyAI<br />in Action</h2>
          <p style={{ color:"#8ab09a", fontSize:15, lineHeight:1.7, marginBottom:24 }}>This is how James talks with your customers in real-time.</p>
          {["Natural conversations","Instant responses","Books appointments","Answers any question"].map(f => (
            <div key={f} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <span style={{ color:G }}>✓</span>
              <span style={{ color:"#c5dfd0", fontSize:14 }}>{f}</span>
            </div>
          ))}
          <button className="btn-primary" style={{ marginTop:24 }} onClick={() => setView("demo")}>Try It Yourself →</button>
        </div>
        <div className="card" style={{ padding:18, borderRadius:18, background:"#060d09" }}>
          {[
            { from:"customer", text:"Hi, do you have a table for tonight?", time:"10:30 AM" },
            { from:"bot", text:"Hello! 👋 Yes, we have tables available. How many people?", time:"10:30 AM" },
            { from:"customer", text:"For 4 people.", time:"10:30 AM" },
            { from:"bot", text:"Great! What time would you like to book?", time:"10:30 AM" },
            { from:"customer", text:"At 8 PM.", time:"10:31 AM" },
            { from:"bot", text:"Perfect! Booking confirmed for 4 people at 8 PM ✅ See you tonight!", time:"10:31 AM" },
          ].map((m, i) => (
            <div key={i} style={{ display:"flex", justifyContent: m.from==="customer" ? "flex-start" : "flex-end", marginBottom:8 }}>
              <div style={{ maxWidth:"80%", padding:"8px 12px", borderRadius: m.from==="customer" ? "12px 12px 12px 3px" : "12px 12px 3px 12px", background: m.from==="customer" ? "#1a3522" : G, fontSize:12, lineHeight:1.5, color: m.from==="bot" ? "white" : "#c5dfd0" }}>
                {m.text}
                <div style={{ fontSize:10, opacity:0.6, marginTop:3, textAlign:"right" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon:"🤖", title:"AI Auto Replies", desc:"Answer common questions instantly and naturally, 24/7" },
    { icon:"🔗", title:"Multi-Channel", desc:"WhatsApp, Instagram, Website & more in one place" },
    { icon:"📅", title:"Smart Booking", desc:"Book appointments and manage schedules automatically" },
    { icon:"🎯", title:"Lead Capture", desc:"Collect leads and grow your customer base effortlessly" },
    { icon:"📊", title:"Analytics", desc:"Track conversations and measure your performance" },
    { icon:"🌍", title:"Multi-Language", desc:"James speaks Arabic, English, French and more" },
  ];
  return (
    <section style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div className="tag" style={{ marginBottom:14 }}>Features</div>
        <h2 style={{ fontSize:38, fontWeight:800, letterSpacing:-0.5 }}>What Can <span style={{ color:G }}>ReplyAI</span> Do?</h2>
      </div>
      <div className="features-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {feats.map(f => (
          <div key={f.title} className="card" style={{ padding:26, borderRadius:16, transition:"border-color 0.2s, transform 0.2s", cursor:"default" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=G;e.currentTarget.style.transform="translateY(-3px)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a3522";e.currentTarget.style.transform="translateY(0)"}}>
            <div style={{ fontSize:30, marginBottom:14 }}>{f.icon}</div>
            <h4 style={{ fontFamily:"Syne,sans-serif", fontSize:16, marginBottom:8 }}>{f.title}</h4>
            <p style={{ color:"#8ab09a", fontSize:13, lineHeight:1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing({ setView, setPlan }) {
  const plans = [
    { name:"Starter", price:29, desc:"Perfect for small businesses", features:["1 AI Assistant (James)","WhatsApp + Website","Basic Analytics","100 Conversations/month","Email support"] },
    { name:"Pro", price:79, desc:"Best for growing businesses", popular:true, features:["2 AI Assistants","WhatsApp + Instagram + Website","Advanced Analytics","500 Conversations/month","Urgent owner alerts","Priority support"] },
    { name:"Business", price:199, desc:"For large businesses", features:["5 AI Assistants","All Channels","Premium Analytics + Reports","Unlimited Conversations","Booking management","Dedicated onboarding"] },
  ];
  return (
    <section id="pricing" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div className="tag" style={{ marginBottom:14 }}>Pricing</div>
        <h2 style={{ fontSize:38, fontWeight:800, letterSpacing:-0.5 }}>Simple, Transparent Pricing</h2>
        <p style={{ color:"#8ab09a", marginTop:12, fontSize:15 }}>14-day free trial · No credit card needed · Cancel anytime</p>
      </div>
      <div className="pricing-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ background:"#0d1a12", border:`1.5px solid ${plan.popular ? G : "#1a3522"}`, borderRadius:20, padding:28, position:"relative", display:"flex", flexDirection:"column" }}>
            {plan.popular && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:G, color:"white", fontSize:11, fontWeight:700, padding:"4px 16px", borderRadius:20, whiteSpace:"nowrap" }}>Most Popular</div>}
            <p style={{ color:"#8ab09a", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:0.5, marginBottom:4 }}>{plan.name}</p>
            <p style={{ color:"#3d6b52", fontSize:13, marginBottom:16 }}>{plan.desc}</p>
            <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:24 }}>
              <span style={{ fontFamily:"Syne,sans-serif", fontSize:44, fontWeight:800 }}>${plan.price}</span>
              <span style={{ color:"#8ab09a", fontSize:14 }}>/month</span>
            </div>
            <div style={{ flex:1, marginBottom:24 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display:"flex", gap:10, marginBottom:11, alignItems:"flex-start" }}>
                  <span style={{ color:G, flexShrink:0, marginTop:1 }}>✓</span>
                  <span style={{ color:"#c5dfd0", fontSize:13, lineHeight:1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setPlan(plan); setView("setup"); }}
              style={{ width:"100%", padding:"13px", borderRadius:12, border: plan.popular ? "none" : "1.5px solid #1a3522", background: plan.popular ? G : "transparent", color: plan.popular ? "white" : G, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"DM Sans,sans-serif", transition:"all 0.2s" }}>
              Start Free Trial
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name:"Ahmed R.", role:"Restaurant Owner", text:"ReplyAI transformed how we talk to customers. We never miss a booking anymore!", stars:5 },
    { name:"Sara M.", role:"Salon Owner", text:"Our response time improved by 90%. More happy customers and more sales!", stars:5 },
    { name:"James T.", role:"Travel Agency", text:"The AI handles most questions so my team can focus on important tasks.", stars:5 },
    { name:"Lina K.", role:"E-commerce Store", text:"Best investment for our business. Setting up was so easy and fast.", stars:5 },
  ];
  return (
    <section style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div className="tag" style={{ marginBottom:14 }}>Testimonials</div>
        <h2 style={{ fontSize:38, fontWeight:800, letterSpacing:-0.5 }}>Trusted by Business Owners</h2>
      </div>
      <div className="testimonials-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {testimonials.map(t => (
          <div key={t.name} className="card" style={{ padding:26, borderRadius:16 }}>
            <div style={{ color:"#f0c040", fontSize:16, marginBottom:12 }}>{"★".repeat(t.stars)}</div>
            <p style={{ color:"#c5dfd0", fontSize:14, lineHeight:1.7, marginBottom:16, fontStyle:"italic" }}>"{t.text}"</p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:"#1a3522", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>👤</div>
              <div>
                <p style={{ fontWeight:600, fontSize:14 }}>{t.name}</p>
                <p style={{ color:"#8ab09a", fontSize:12 }}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Roadmap() {
  const phases = [
    { m:"M 1-2", label:"Launch", color:G },
    { m:"M 3", label:"Redesign", color:G },
    { m:"M 4-5", label:"Go Bigger", color:G },
    { m:"M 6", label:"2nd Design", color:"#f0c040" },
    { m:"M 7-9", label:"App Launch", color:"#f0c040" },
    { m:"M 10-12", label:"Scale Up", color:"#f0c040" },
    { m:"Year 2", label:"Premium", color:"#a78bfa" },
  ];
  return (
    <section id="roadmap" style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <div className="tag" style={{ marginBottom:14 }}>Roadmap</div>
        <h2 style={{ fontSize:38, fontWeight:800, letterSpacing:-0.5 }}>Our 12-Month Roadmap</h2>
      </div>
      <div className="card" style={{ padding:36, borderRadius:20 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:4, flexWrap:"wrap" }}>
          {phases.map((p, i) => (
            <div key={p.m} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ width:54, height:54, borderRadius:"50%", background:"#0d1a12", border:`2px solid ${p.color}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8, fontSize:22 }}>🚀</div>
                <p style={{ color:p.color, fontSize:11, fontWeight:700 }}>{p.m}</p>
                <p style={{ color:"#3d6b52", fontSize:11 }}>{p.label}</p>
              </div>
              {i < phases.length-1 && <div style={{ width:16, height:1, background:"#1a3522", marginBottom:22 }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ setView }) {
  return (
    <section style={{ padding:"80px 32px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ background:"linear-gradient(135deg, #0d1a12 0%, #0a2518 100%)", border:`1.5px solid ${G}`, borderRadius:24, padding:"60px 40px", textAlign:"center" }}>
        <h2 style={{ fontSize:38, fontWeight:800, marginBottom:16, letterSpacing:-0.5 }}>Ready to Grow Your Business?</h2>
        <p style={{ color:"#8ab09a", fontSize:16, marginBottom:32, maxWidth:480, margin:"0 auto 32px" }}>Join 100+ businesses using ReplyAI to save time, increase sales and delight customers.</p>
        <div className="cta-btns" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-primary glow" style={{ fontSize:16, padding:"14px 36px" }} onClick={() => setView("setup")}>Start Free Trial</button>
          <button className="btn-outline" style={{ display:"flex", alignItems:"center", gap:8 }} onClick={() => setView("demo")}>
            Watch Demo <span style={{ background:G, borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>▶</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#060d09", borderTop:"1px solid #1a3522", padding:"50px 32px 30px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <div style={{ width:32, height:32, borderRadius:9, background:G, display:"flex", alignItems:"center", justifyContent:"center" }}>🤖</div>
              <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:18 }}>ReplyAI</span>
            </div>
            <p style={{ color:"#8ab09a", fontSize:13, lineHeight:1.7, maxWidth:240 }}>Your 24/7 AI assistant for customer conversations and business growth.</p>
            <div style={{ display:"flex", gap:10, marginTop:16 }}>
              {["💬","📸","👥","💼","🐦"].map((icon, i) => (
                <div key={i} style={{ width:32, height:32, borderRadius:8, background:"#0d1a12", border:"1px solid #1a3522", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>{icon}</div>
              ))}
            </div>
          </div>
          {[
            { title:"Product", links:["Features","Pricing","Demo","Roadmap"] },
            { title:"Company", links:["About Us","Blog","Careers","Contact"] },
            { title:"Legal", links:["Terms of Service","Privacy Policy","Refund Policy"] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontWeight:700, marginBottom:16, fontFamily:"Syne,sans-serif", fontSize:14 }}>{col.title}</p>
              {col.links.map(l => <p key={l} style={{ color:"#8ab09a", fontSize:13, marginBottom:10, cursor:"pointer" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid #1a3522", paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <p style={{ color:"#3d6b52", fontSize:13 }}>© 2025 ReplyAI. All rights reserved.</p>
          <p style={{ color:"#3d6b52", fontSize:13 }}>Made with 💚 for businesses worldwide</p>
        </div>
      </div>
    </footer>
  );
}

function SetupPage({ plan, setView }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ businessName:"", ownerName:"", phone:"", hours:"Mon-Sat 9am-6pm, Sun Closed", services:"", faqs:"", urgentPhone:"" });
  const steps = [
    { title:"Business Info", emoji:"🏪", fields:[{key:"businessName",label:"Business Name",ph:"e.g. Bella's Salon"},{key:"ownerName",label:"Your Name",ph:"e.g. Sarah Ahmed"},{key:"phone",label:"Phone / WhatsApp",ph:"+971 50 000 0000"}]},
    { title:"What You Offer", emoji:"💼", fields:[{key:"hours",label:"Opening Hours",ph:"Mon-Sat 9am-6pm"},{key:"services",label:"Services & Prices",ph:"Haircut $30, Colour $80...",multi:true},{key:"faqs",label:"FAQs",ph:"Do you accept walk-ins? Yes!",multi:true}]},
    { title:"Go Live", emoji:"🚀", fields:[{key:"urgentPhone",label:"Urgent Alert Phone",ph:"+971 50 000 0000"}]},
  ];
  if(done) return (
    <div style={{minHeight:"100vh",background:"#060d09",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="card" style={{padding:40,maxWidth:440,width:"100%",textAlign:"center",borderRadius:24}}>
        <div style={{fontSize:52,marginBottom:16}}>🎉</div>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:800,marginBottom:8}}>James is Live!</h2>
        <p style={{color:"#8ab09a",marginBottom:28}}>Your AI assistant is ready for {form.businessName||"your business"}.</p>
        <div style={{display:"flex",gap:10}}>
          <button className="btn-primary" style={{flex:1}} onClick={()=>setView("demo")}>Try James 🤖</button>
          <button className="btn-outline" style={{flex:1}} onClick={()=>setView("landing")}>Back Home</button>
        </div>
      </div>
    </div>
  );
  const cur = steps[step];
  return (
    <div style={{minHeight:"100vh",background:"#060d09",display:"flex",alignItems:"center",justifyContent:"center",padding:20,paddingTop:80}}>
      <div style={{maxWidth:480,width:"100%"}}>
        <div style={{display:"flex",gap:6,marginBottom:28}}>
          {steps.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<=step?G:"#1a3522",transition:"background 0.3s"}}/>)}
        </div>
        <div className="card" style={{padding:"32px 28px",borderRadius:20}}>
          <p style={{color:G,fontSize:12,fontWeight:700,marginBottom:4}}>{plan?.name||"Starter"} Plan · Step {step+1} of {steps.length}</p>
          <h2 style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,marginBottom:24}}>{cur.emoji} {cur.title}</h2>
          {cur.fields.map(f=>(
            <div key={f.key} style={{marginBottom:18}}>
              <label style={{display:"block",color:"#8ab09a",fontSize:13,fontWeight:500,marginBottom:7}}>{f.label}</label>
              {f.multi?<textarea value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.ph} rows={3} style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1.5px solid #1a3522",background:"#060d09",color:"white",fontSize:13,resize:"vertical",fontFamily:"inherit",outline:"none"}}/>
              :<input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.ph} style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1.5px solid #1a3522",background:"#060d09",color:"white",fontSize:13,outline:"none"}}/>}
            </div>
          ))}
          <div style={{display:"flex",gap:10,marginTop:24}}>
            {step>0&&<button className="btn-outline" style={{flex:1}} onClick={()=>setStep(s=>s-1)}>← Back</button>}
            <button className="btn-primary" style={{flex:2}} onClick={()=>step<steps.length-1?setStep(s=>s+1):setDone(true)}>
              {step<steps.length-1?"Continue →":"🚀 Launch James!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`You are James, a warm and professional AI assistant for "Bella's Salon" in Dubai. Help customers 24/7.\nBusiness: Bella's Salon, 14 Marina Walk, Dubai Marina\nOwner: Sarah | Phone: +971-50-123-4567\nHours: Mon-Sat 9am-7pm | Sun 11am-5pm\nServices: Women's haircut $30, Men's $20, Blow dry $25, Full colour $90, Highlights $70, Keratin $120, Manicure $25, Pedicure $35\nStyle: warm, friendly, concise 2-3 sentences. If urgent: say you are alerting Sarah now and she will respond within 30 minutes.`,messages:history.map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text}))})});
      const data=await res.json();
      setMsgs(prev=>[...prev,{role:"assistant",text:data.content?.[0]?.text||"Let me get that for you!"}]);
    }catch{setMsgs(prev=>[...prev,{role:"assistant",text:"Sorry, had a hiccup! Please try again."}]);}
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:"#060d09",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 16px",paddingTop:80}}>
      <div style={{maxWidth:500,width:"100%"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <h2 style={{fontFamily:"Syne,sans-serif",fontSize:20,fontWeight:800,marginBottom:2}}>Talk to James — Live AI</h2>
            <p style={{color:"#8ab09a",fontSize:13}}>Powered by real AI · Ask anything</p>
          </div>
          <button className="btn-outline" style={{fontSize:13,padding:"7px 16px"}} onClick={()=>setView("landing")}>← Back</button>
        </div>
        <div className="card" style={{overflow:"hidden",borderRadius:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid #1a3522"}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🤖</div>
            <div><p style={{fontFamily:"Syne,sans-serif",fontSize:14,fontWeight:700}}>James</p><p style={{fontSize:11,color:G}}>● Online · Bella's Salon</p></div>
          </div>
          <div style={{height:340,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:10}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?G:"#1a3522",color:m.role==="user"?"white":"#c5dfd0",fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.text}</div>
              </div>
            ))}
            {loading&&<div style={{display:"flex",gap:5,padding:"10px 14px",background:"#1a3522",borderRadius:"16px 16px 16px 4px",width:"fit-content"}}>{[0,0.2,0.4].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:G,animation:`typing 1s infinite ${d}s`}}/>)}</div>}
            <div ref={bottomRef}/>
          </div>
          <div style={{padding:"8px 12px 6px",borderTop:"1px solid #1a3522",display:"flex",flexWrap:"wrap",gap:6}}>
            {["What are your prices?","Are you open Sunday?","I want to book","This is urgent!"].map(q=>(
              <button key={q} onClick={()=>send(q)} style={{fontSize:11,padding:"5px 11px",borderRadius:16,border:"1px solid #1a3522",background:"transparent",color:"#8ab09a",cursor:"pointer",fontFamily:"inherit"}}>{q}</button>
            ))}
          </div>
          <div style={{padding:"10px 12px",borderTop:"1px solid #1a3522",display:"flex",gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type your message to James..." style={{flex:1,padding:"10px 14px",borderRadius:24,border:"1.5px solid #1a3522",background:"#060d09",color:"white",fontSize:13,outline:"none"}}/>
            <button onClick={()=>send()} style={{width:40,height:40,borderRadius:"50%",border:"none",background:G,color:"white",cursor:"pointer",fontSize:17,flexShrink:0}}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [plan, setPlan] = useState(null);
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#060d09", minHeight:"100vh" }}>
      <style>{css}</style>
      {view === "landing" && (
        <>
          <Nav setView={setView} />
          <Hero setView={setView} />
          <Marquee />
          <Problem />
          <HowItWorks />
          <LiveDemo setView={setView} />
          <Features />
          <Pricing setView={setView} setPlan={setPlan} />
          <Testimonials />
          <Roadmap />
          <CTA setView={setView} />
          <Footer />
        </>
      )}
      {view === "setup" && <SetupPage plan={plan} setView={setView} />}
      {view === "demo" && <DemoPage setView={setView} />}
    </div>
  );
}
