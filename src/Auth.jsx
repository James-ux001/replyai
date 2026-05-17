import { useState } from "react";

const SUPABASE_URL = "https://roahaprhzdhkleeawxlo.supabase.co";
const SUPABASE_KEY = "sb_publishable_--FMnWeMo-3fTTPRRXPyPQ__Bx4O3dG";

const DARK = "#0a0f0d";
const CARD = "#111816";
const BORDER = "#1e2d24";
const G = "#00E676";
const TEXT = "#a0bfaa";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:#0a0f0d;color:#fff}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,230,118,0.2)}50%{box-shadow:0 0 40px rgba(0,230,118,0.5)}}
  .fade-up{animation:fadeUp 0.6s ease forwards}
  input{font-family:'Inter',sans-serif;outline:none}
  input::placeholder{color:#2d4a38}
`;

async function supabaseSignUp(email, password, fullName) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({ email, password, data: { full_name: fullName } }),
  });
  return res.json();
}

async function supabaseSignIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function supabaseSignOut(token) {
  await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${token}`,
    },
  });
}

function InputField({ label, type, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", color: TEXT, fontSize: 13, fontWeight: 500, marginBottom: 7 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width: "100%", padding: "12px 16px", paddingRight: isPassword ? 48 : 16, borderRadius: 11, border: `1.5px solid ${BORDER}`, background: DARK, color: "white", fontSize: 14, transition: "border-color 0.2s" }}
          onFocus={e => e.target.style.borderColor = G}
          onBlur={e => e.target.style.borderColor = BORDER}
        />
        {isPassword && (
          <button onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: TEXT, cursor: "pointer", fontSize: 16 }}>
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}

export function SignUpPage({ onSuccess, onGoLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async () => {
    setError("");
    if (!fullName || !email || !password || !confirm) return setError("Please fill in all fields.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const data = await supabaseSignUp(email, password, fullName);
      if (data.error) {
        setError(data.error.message || data.msg || "Signup failed. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (success) return (
    <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <style>{css}</style>
      <div className="fade-up" style={{ background: CARD, border: `1.5px solid ${G}`, borderRadius: 24, padding: "40px 36px", maxWidth: 420, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>📧</div>
        <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Check your email!</h2>
        <p style={{ color: TEXT, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>We sent a confirmation link to <strong style={{ color: "white" }}>{email}</strong>. Click it to activate your account then log in.</p>
        <button onClick={onGoLogin} style={{ width: "100%", padding: "13px", borderRadius: 11, border: "none", background: G, color: DARK, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
          Go to Login →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <style>{css}</style>
      <div className="fade-up" style={{ maxWidth: 440, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, cursor: "pointer" }} onClick={onGoLogin}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
            <span style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 20 }}>ReplyAI</span>
          </div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Create your account</h1>
          <p style={{ color: TEXT, fontSize: 14 }}>Start your 14-day free trial — no credit card needed</p>
        </div>

        <div style={{ background: CARD, border: `1.5px solid ${BORDER}`, borderRadius: 20, padding: "32px 28px" }}>
          <InputField label="Full Name" type="text" value={fullName} onChange={setFullName} placeholder="e.g. Sarah Ahmed" />
          <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@business.com" />
          <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="Min. 6 characters" />
          <InputField label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat your password" />

          {error && (
            <div style={{ background: "#2d0a0a", border: "1px solid #e06060", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#e06060", fontSize: 13 }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleSignUp} disabled={loading}
            style={{ width: "100%", padding: "13px", borderRadius: 11, border: "none", background: G, color: DARK, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "Inter,sans-serif", animation: "glow 2s infinite", marginBottom: 16 }}>
            {loading ? "Creating account..." : "🚀 Create Free Account"}
          </button>

          <p style={{ textAlign: "center", color: TEXT, fontSize: 13 }}>
            Already have an account?{" "}
            <span onClick={onGoLogin} style={{ color: G, cursor: "pointer", fontWeight: 600 }}>Log in</span>
          </p>
        </div>

        <p style={{ textAlign: "center", color: "#2d4a38", fontSize: 12, marginTop: 16 }}>
          By signing up you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export function LoginPage({ onSuccess, onGoSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Please enter your email and password.");
    setLoading(true);
    try {
      const data = await supabaseSignIn(email, password);
      if (data.error || !data.access_token) {
        setError(data.error?.message || data.msg || "Invalid email or password.");
      } else {
        localStorage.setItem("replyai_token", data.access_token);
        localStorage.setItem("replyai_user", JSON.stringify({ email, name: data.user?.user_metadata?.full_name || email.split("@")[0] }));
        onSuccess(data);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <style>{css}</style>
      <div className="fade-up" style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
            <span style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 20 }}>ReplyAI</span>
          </div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Welcome back!</h1>
          <p style={{ color: TEXT, fontSize: 14 }}>Log in to manage your AI assistant</p>
        </div>

        <div style={{ background: CARD, border: `1.5px solid ${BORDER}`, borderRadius: 20, padding: "32px 28px" }}>
          <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@business.com" />
          <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" />

          {error && (
            <div style={{ background: "#2d0a0a", border: "1px solid #e06060", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#e06060", fontSize: 13 }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleLogin} disabled={loading}
            style={{ width: "100%", padding: "13px", borderRadius: 11, border: "none", background: G, color: DARK, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "Inter,sans-serif", marginBottom: 16 }}>
            {loading ? "Logging in..." : "Log In →"}
          </button>

          <p style={{ textAlign: "center", color: TEXT, fontSize: 13 }}>
            Don't have an account?{" "}
            <span onClick={onGoSignUp} style={{ color: G, cursor: "pointer", fontWeight: 600 }}>Sign up free</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export { supabaseSignOut };
