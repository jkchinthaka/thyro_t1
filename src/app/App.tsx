import { useState, useRef, useEffect } from "react";
import {
  User, MessageCircle, Calendar, AlertTriangle, Phone, Send, Mic, Paperclip,
  Heart, ArrowRight, CheckCircle, Clock, Star, Play, Plus, Shield,
  ChevronLeft, Stethoscope, Info, Edit2, Camera,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

import { Card, Badge, Btn, Input, Avatar } from "@/components/common";
import { DashboardLayout } from "@/layouts";
import { TEAL, BLUE, GREEN, AMBER, RED, GRAY } from "@/constants/colors";
import { severityLabels, moodLabels, iodineSeverityLabels } from "@/constants/status";
import type { Screen, ChatMsg } from "@/types";
import {
  mockUser,
  mockLandingFeatures,
  mockLandingStats,
  mockDashboardCards,
  mockDashboardQuickStats,
  mockDashboardWeekData,
  mockDashboardReminders,
  mockInitialMessages,
  mockQuickActions,
  mockSuggestions,
  mockRecentChats,
  mockChatReply,
  mockMedications,
  mockAdherenceData,
  mockPrescriptionInfo,
  mockInitialTaken,
  mockFoodsToEat,
  mockFoodsToAvoid,
  mockMeals,
  mockDietStatus,
  mockSymptoms,
  mockSymptomRecommendations,
  mockAppointments,
  mockTshHistory,
  mockNextAppointment,
  mockWeeklyHealthData,
  mockWellnessBreakdown,
  mockMoodEmojis,
  mockProgressStats,
  mockHealthScore,
  mockArticles,
  mockFaqs,
  mockVideos,
  mockEmergencyCallOptions,
  mockEmergencyWarningSigns,
  mockEmergencyContacts,
} from "@/data/mock";

// ── SCREEN: Landing ──────────────────────────────────────────────────────────

function LandingScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const features = mockLandingFeatures;

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ThyroCare AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Btn variant="ghost" size="sm" onClick={() => setScreen("login")}>Sign In</Btn>
            <Btn size="sm" onClick={() => setScreen("register")}>Get Started</Btn>
            <button
              onClick={() => setScreen("emergency")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" /> Emergency
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge color="blue">AI-Powered Healthcare Support</Badge>
          <h1 className="text-5xl font-extrabold text-foreground leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Your Recovery,<br />
            <span style={{ background: `linear-gradient(90deg, ${BLUE}, ${TEAL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Supported Every Step
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ThyroCare AI is your intelligent companion for life after thyroidectomy — providing personalized guidance, medication support, dietary advice, and 24/7 AI chat for differentiated thyroid cancer survivors.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn size="lg" onClick={() => setScreen("register")}>Start Your Journey <ArrowRight className="w-5 h-5" /></Btn>
            <Btn variant="ghost" size="lg" onClick={() => setScreen("chat")}>Try AI Chat Free</Btn>
          </div>
          <div className="flex items-center gap-6 pt-2">
            {mockLandingStats.map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{val}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=500&fit=crop&auto=format"
              alt="Healthcare professional supporting patient"
              className="w-full h-80 object-cover"
            />
          </div>
          {/* Chat preview bubble */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-border max-w-56">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">ThyroCare AI</p>
                <p className="text-xs text-muted-foreground mt-0.5">Your Levothyroxine reminder: Take 100mcg with water 30 min before breakfast. ✓</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-2xl shadow-xl px-4 py-2.5">
            <div className="text-xs font-bold">Health Score</div>
            <div className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>87/100</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Everything You Need to Recover Confidently</h2>
          <p className="text-muted-foreground">Comprehensive tools designed specifically for post-thyroidectomy patients</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="hover:shadow-md transition-shadow cursor-default">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}18` }}>
                  <Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-foreground mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-3xl p-10 text-center text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Begin Your Recovery Journey Today</h2>
          <p className="opacity-90 mb-6 max-w-md mx-auto">Join thousands of thyroid cancer survivors who trust ThyroCare AI for their daily healthcare support.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button onClick={() => setScreen("register")} className="px-7 py-3.5 bg-white rounded-xl font-bold text-blue-600 hover:bg-blue-50 transition cursor-pointer">
              Create Free Account
            </button>
            <button onClick={() => setScreen("login")} className="px-7 py-3.5 bg-white/20 rounded-xl font-bold text-white border border-white/30 hover:bg-white/30 transition cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="border-t border-border px-6 py-6 text-center">
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          <Shield className="w-3.5 h-3.5 inline mr-1" />
          <strong>Medical Disclaimer:</strong> ThyroCare AI provides informational support only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for medical decisions. In case of emergency, call 911 or your local emergency services immediately.
        </p>
      </footer>
    </div>
  );
}

// ── SCREEN: Login ────────────────────────────────────────────────────────────

function LoginScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [email, setEmail] = useState(mockUser.email);
  const [password, setPassword] = useState(mockUser.passwordPlaceholder);
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen bg-background grid lg:grid-cols-2" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left panel */}
      <div className="flex flex-col justify-center px-8 py-12 max-w-md mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ThyroCare AI</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Welcome back</h1>
          <p className="text-muted-foreground">Continue your recovery journey</p>
        </div>

        <div className="space-y-4">
          <Input label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} icon={<User className="w-4 h-4" />} />
          <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={setPassword} />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <button className="text-sm font-semibold text-primary hover:underline cursor-pointer">Forgot password?</button>
          </div>

          <Btn className="w-full justify-center" size="lg" onClick={() => setScreen("dashboard")}>
            Sign In
          </Btn>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or continue with</span></div>
          </div>

          <button className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-border bg-white hover:bg-gray-50 transition text-sm font-semibold text-foreground cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <button onClick={() => setScreen("register")} className="font-semibold text-primary hover:underline cursor-pointer">Create one</button>
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:block relative overflow-hidden rounded-l-3xl m-4">
        <img
          src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&h=900&fit=crop&auto=format"
          alt="Healthcare and recovery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${BLUE}88 0%, ${TEAL}aa 100%)` }} />
        <div className="absolute bottom-12 left-8 right-8 text-white">
          <p className="text-2xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            "ThyroCare AI transformed my recovery experience completely."
          </p>
          <p className="opacity-80 text-sm">— Sarah M., Thyroid Cancer Survivor, 18 months post-surgery</p>
          <div className="flex gap-1 mt-3">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current text-yellow-300" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN: Register ─────────────────────────────────────────────────────────

function RegisterScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [rai, setRai] = useState<"yes" | "no" | null>(null);
  const [gender, setGender] = useState<string>("female");

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-8">
          <button onClick={() => setScreen("landing")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition cursor-pointer">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Create Your Account</h1>
          <p className="text-muted-foreground">Join ThyroCare AI and take control of your recovery</p>
        </div>
        <Card>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Sarah Johnson" />
            <Input label="Email Address" type="email" placeholder="sarah@email.com" />
            <Input label="Password" type="password" placeholder="Create a strong password" />
            <Input label="Confirm Password" type="password" placeholder="Repeat your password" />
            <Input label="Age" type="number" placeholder="35" />
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Gender</label>
              <div className="flex gap-2">
                {["female", "male", "other"].map(g => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border capitalize transition cursor-pointer ${
                      gender === g ? "border-primary bg-blue-50 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Date of Surgery</label>
              <input type="date" defaultValue="2023-09-15" className="w-full rounded-xl border border-border bg-input-background py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Radioactive Iodine Treatment</label>
              <div className="flex gap-2">
                {[["yes", "Yes, I had RAI"], ["no", "No RAI treatment"]].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setRai(val as "yes" | "no")}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition cursor-pointer ${
                      rai === val ? "border-primary bg-blue-50 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-1 rounded" />
              <span className="text-sm text-muted-foreground">I agree to the <span className="text-primary font-semibold">Terms of Service</span> and <span className="text-primary font-semibold">Privacy Policy</span></span>
            </label>
            <Btn className="w-full justify-center" size="lg" onClick={() => setScreen("dashboard")}>
              Create Account <ArrowRight className="w-5 h-5" />
            </Btn>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => setScreen("login")} className="font-semibold text-primary hover:underline cursor-pointer">Sign in</button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── SCREEN: Dashboard ────────────────────────────────────────────────────────

function DashboardScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const cards = mockDashboardCards;
  const weekData = mockDashboardWeekData;

  return (
    <DashboardLayout screen="dashboard" setScreen={setScreen} title="Good morning, Sarah 👋">
      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockDashboardQuickStats.map(s => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {s.value}<span className="text-sm font-normal text-muted-foreground">{s.unit}</span>
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map(c => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setScreen(c.id as Screen)}
              className="text-left bg-white rounded-2xl border border-border p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ background: c.bg }}>
                <Icon className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.label}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{c.value}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Bottom grid: chart + alerts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Weekly Health Score</h3>
            <Badge color="blue">This week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weekData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BLUE} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: GRAY }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: GRAY }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="score" stroke={BLUE} strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: BLUE, strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today&apos;s Reminders</h3>
          <div className="space-y-3">
            {mockDashboardReminders.map(r => (
              <div key={r.task} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${r.done ? "bg-green-100" : "bg-muted"}`}>
                  {r.done ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${r.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{r.task}</div>
                  <div className="text-xs text-muted-foreground">{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// ── SCREEN: Chat ─────────────────────────────────────────────────────────────

// ── SCREEN: Chat ─────────────────────────────────────────────────────────────

function ChatScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>(mockInitialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMsg = { id: Date.now(), from: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply: ChatMsg = {
        id: Date.now() + 1, from: "ai",
        text: mockChatReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMsgs(prev => [...prev, reply]);
    }, 1800);
  };

  return (
    <DashboardLayout screen="chat" setScreen={setScreen} title="AI Health Assistant">
      <div className="flex gap-4 h-[calc(100vh-130px)]">
        {/* Chat history sidebar */}
        <Card className="w-56 flex-shrink-0 hidden lg:flex flex-col p-3 gap-2">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1">Recent Chats</h4>
          {mockRecentChats.map(c => (
            <button key={c.label} className="text-left px-2 py-2 rounded-xl hover:bg-accent transition text-sm cursor-pointer">
              <div className="font-medium text-foreground truncate">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.date}</div>
            </button>
          ))}
          <Btn variant="ghost" size="sm" className="mt-auto w-full justify-center">
            <Plus className="w-4 h-4" /> New Chat
          </Btn>
        </Card>

        {/* Main chat */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Emergency banner */}
          <div className="bg-red-50 border-b border-red-200 px-4 py-2.5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-xs text-red-700 flex-1">
              <strong>Emergency:</strong> If experiencing chest pain, severe breathing difficulty, or high fever — call 911 immediately or visit your nearest ER.
            </span>
            <button onClick={() => setScreen("emergency")} className="text-xs font-bold text-red-600 hover:underline cursor-pointer whitespace-nowrap">Emergency Help</button>
          </div>

          {/* Quick actions */}
          <div className="px-4 py-2.5 border-b border-border flex gap-2 overflow-x-auto scrollbar-hide">
            {mockQuickActions.map(a => (
              <button
                key={a}
                onClick={() => send(a)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
              >
                {a}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {msgs.map(m => (
              <div key={m.id} className={`flex gap-3 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                {m.from === "ai" ? (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-end" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <Avatar name={mockUser.name} size={8} />
                )}
                <div className={`max-w-lg ${m.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      m.from === "ai"
                        ? "bg-muted text-foreground rounded-tl-sm"
                        : "text-white rounded-tr-sm"
                    }`}
                    style={m.from === "user" ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-border">
            {mockSuggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-border text-muted-foreground hover:border-primary hover:text-primary transition cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer"><Paperclip className="w-5 h-5" /></button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask about your symptoms, medications, diet..."
              className="flex-1 py-2.5 px-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer"><Mic className="w-5 h-5" /></button>
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition disabled:opacity-40 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// ── SCREEN: Medication ───────────────────────────────────────────────────────

function MedicationScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [taken, setTaken] = useState<string[]>([...mockInitialTaken]);

  const meds = mockMedications;
  const adherenceData = mockAdherenceData;

  return (
    <DashboardLayout screen="medication" setScreen={setScreen} title="Medication Management">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Medications list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today&apos;s Medications</h2>
            <Badge color="green">3 of 4 taken</Badge>
          </div>

          {meds.map(med => {
            const isTaken = taken.includes(med.id);
            const Icon = med.icon;
            return (
              <Card key={med.id} className={`border-l-4 transition-all ${isTaken ? "opacity-70" : ""}`} style={{ borderLeftColor: med.color }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${med.color}18` }}>
                    <Icon className="w-6 h-6" style={{ color: med.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{med.name}</h3>
                      <Badge color={isTaken ? "green" : "blue"}>{isTaken ? "Taken" : "Pending"}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{med.dose} · {med.time}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{med.instruction}</p>
                  </div>
                  <button
                    onClick={() => setTaken(t => isTaken ? t.filter(x => x !== med.id) : [...t, med.id])}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                      isTaken
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "text-white hover:opacity-90"
                    }`}
                    style={!isTaken ? { background: `linear-gradient(135deg, ${med.color}, ${TEAL})` } : {}}
                  >
                    {isTaken ? <><CheckCircle className="w-4 h-4" /> Taken</> : <><Plus className="w-4 h-4" /> Mark Taken</>}
                  </button>
                </div>
              </Card>
            );
          })}

          {/* Missed alert */}
          <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Missed medication reminder</p>
              <p className="text-xs text-amber-700 mt-0.5">You missed Calcium Carbonate on Monday. Consistent medication adherence is critical for your recovery. Please consult your doctor if you frequently miss doses.</p>
            </div>
          </div>
        </div>

        {/* Sidebar: adherence chart */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Adherence Rate</h3>
            <div className="text-4xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: GREEN }}>94%</div>
            <p className="text-sm text-muted-foreground mb-4">Last 30 days — excellent!</p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={adherenceData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: GRAY }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: GRAY }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="pct" fill={TEAL} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Prescription Info</h3>
            <div className="space-y-3 text-sm">
              {mockPrescriptionInfo.map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-semibold text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
            <Btn className="w-full justify-center mt-4" variant="ghost" size="sm">Request Refill</Btn>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ── SCREEN: Diet ─────────────────────────────────────────────────────────────

function DietScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [tab, setTab] = useState<"eat" | "avoid" | "meals">("eat");

  const foodsToEat = mockFoodsToEat;
  const foodsToAvoid = mockFoodsToAvoid;
  const meals = mockMeals;

  return (
    <DashboardLayout screen="diet" setScreen={setScreen} title="Low-Iodine Diet Guide">
      {/* Day status */}
      <div className="rounded-2xl p-5 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${GREEN}, ${TEAL})` }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-semibold opacity-90 text-sm">{mockDietStatus.title}</p>
            <h2 className="text-2xl font-extrabold mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Day {mockDietStatus.day} of {mockDietStatus.totalDays}</h2>
            <p className="opacity-80 text-sm mt-1">{mockDietStatus.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mockDietStatus.adherencePct}%</div>
            <div className="text-sm opacity-80">Diet adherence today</div>
            <div className="mt-2 bg-white/20 rounded-full h-2 w-32 ml-auto">
              <div className="bg-white rounded-full h-2" style={{ width: `${mockDietStatus.adherencePct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(["eat", "avoid", "meals"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer capitalize ${
              tab === t ? "text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
            style={tab === t ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}}
          >
            {t === "eat" ? "Foods to Eat" : t === "avoid" ? "Foods to Avoid" : "Meal Planner"}
          </button>
        ))}
      </div>

      {tab === "eat" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {foodsToEat.map(f => (
            <Card key={f.name} className="flex items-start gap-3 hover:shadow-md transition-shadow">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <div className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{f.note}</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "avoid" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {foodsToAvoid.map(f => (
            <Card key={f.name} className={`flex items-start gap-3 border-l-4 ${
              f.severity === "high" ? "border-l-red-500" : f.severity === "medium" ? "border-l-amber-400" : "border-l-yellow-300"
            }`}>
              <span className="text-3xl">{f.icon}</span>
              <div>
                <div className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.name}</div>
                <Badge color={f.severity === "high" ? "red" : f.severity === "medium" ? "amber" : "blue"} >
                  {iodineSeverityLabels[f.severity]}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "meals" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {meals.map(m => (
            <Card key={m.meal}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m.meal}</h3>
                <Badge color="teal">{m.cals} cal</Badge>
              </div>
              <ul className="space-y-1.5">
                {m.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

// ── SCREEN: Symptoms ─────────────────────────────────────────────────────────

function SymptomsScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [selected, setSelected] = useState<string[]>(["fatigue"]);
  const [severity, setSeverity] = useState(3);
  const [assessed, setAssessed] = useState(false);

  const symptoms = mockSymptoms;

  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const isCritical = selected.includes("heart-palp") && severity >= 4;

  return (
    <DashboardLayout screen="symptoms" setScreen={setScreen} title="Symptom Checker">
      <div className="max-w-3xl">
        {isCritical && (
          <div className="rounded-2xl p-4 mb-4 bg-red-50 border border-red-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-800">Emergency Warning</p>
              <p className="text-sm text-red-700 mt-0.5">Heart palpitations with high severity may require immediate medical attention. Please contact your doctor or call emergency services.</p>
              <button onClick={() => setScreen("emergency")} className="mt-2 text-sm font-bold text-red-600 hover:underline cursor-pointer">Go to Emergency Support →</button>
            </div>
          </div>
        )}

        <Card className="mb-5">
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Select Your Symptoms</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {symptoms.map(s => {
              const Icon = s.icon;
              const isSelected = selected.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected ? "border-primary bg-blue-50" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isSelected ? "bg-primary" : "bg-muted"}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                  <span className="text-xs font-semibold text-foreground text-center">{s.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="mb-5">
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Severity Level: <span style={{ color: severity <= 2 ? GREEN : severity <= 3 ? AMBER : RED }}>{severityLabels[severity]}</span>
          </h3>
          <input
            type="range" min={1} max={5} value={severity}
            onChange={e => setSeverity(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Mild</span><span>Moderate</span><span>Critical</span>
          </div>
        </Card>

        <Btn size="lg" onClick={() => setAssessed(true)}>
          <Stethoscope className="w-5 h-5" /> Get AI Assessment
        </Btn>

        {assessed && (
          <Card className="mt-5 border-l-4" style={{ borderLeftColor: severity >= 4 ? RED : severity >= 3 ? AMBER : GREEN }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AI Health Assessment</h3>
                <p className="text-xs text-muted-foreground">Based on your selected symptoms and severity</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Based on your reported symptoms <strong className="text-foreground">({selected.map(s => symptoms.find(x => x.id === s)?.label).join(", ")})</strong> at severity level {severity}, here is my assessment:</p>
              <p>These symptoms are <strong className="text-foreground">{severity <= 2 ? "within the normal range" : severity <= 3 ? "worth monitoring closely" : "concerning and require attention"}</strong> for someone 9 months post-thyroidectomy. Fatigue and dry mouth are commonly experienced during the hormonal adjustment period.</p>
              <div className="space-y-1.5 bg-blue-50 rounded-xl p-3 mt-3">
                <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide">Recommendations</p>
                <ul className="space-y-1">
                  {mockSymptomRecommendations.map(r => (
                    <li key={r} className="flex items-start gap-1.5 text-blue-700 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

// ── SCREEN: Follow-up ────────────────────────────────────────────────────────

function FollowupScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const appointments = mockAppointments;

  return (
    <DashboardLayout screen="followup" setScreen={setScreen} title="Follow-up Care">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Care Timeline</h2>
            <Btn size="sm" variant="ghost"><Plus className="w-4 h-4" /> Add Appointment</Btn>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-4">
              {appointments.map((a, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-background z-10 ${
                    a.status === "completed" ? "bg-green-500" : a.status === "upcoming" ? "bg-primary" : "bg-muted"
                  }`}>
                    {a.status === "completed" ? <CheckCircle className="w-5 h-5 text-white" /> : <Calendar className="w-5 h-5 text-white" />}
                  </div>
                  <Card className={`flex-1 ${a.status === "upcoming" ? "border-primary/30 bg-blue-50/50" : ""}`}>
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{a.type}</h3>
                          <Badge color={a.status === "completed" ? "green" : a.status === "upcoming" ? "blue" : "purple"}>
                            {a.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{a.doctor} · {a.date}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.note}</p>
                      </div>
                      {a.status !== "completed" && (
                        <Btn size="sm" variant="ghost">Reschedule</Btn>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Next Appointment</h3>
            <div className="rounded-xl p-4" style={{ background: `linear-gradient(135deg, ${BLUE}18, ${TEAL}18)` }}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{mockNextAppointment.type}</p>
              <p className="text-2xl font-extrabold text-foreground mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mockNextAppointment.date}</p>
              <p className="text-sm text-muted-foreground">{mockNextAppointment.subtitle}</p>
              <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-700 font-semibold"><AlertTriangle className="w-3 h-3 inline mr-1" />{mockNextAppointment.warning}</p>
              </div>
            </div>
            <Btn className="w-full justify-center mt-3" variant="ghost" size="sm">Add to Calendar</Btn>
          </Card>

          <Card>
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TSH History</h3>
            <div className="space-y-2 text-sm">
              {mockTshHistory.map(t => (
                <div key={t.date} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.date}</span>
                  <span className="font-bold text-foreground">{t.value} <span className="text-xs font-normal">mIU/L</span></span>
                  <Badge color={t.status === "optimal" ? "green" : t.status === "normal" ? "blue" : "red"}>{t.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ── SCREEN: Progress ─────────────────────────────────────────────────────────

function ProgressScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const weeklyData = mockWeeklyHealthData;
  const pieData = mockWellnessBreakdown;
  const moods = mockMoodEmojis;

  return (
    <DashboardLayout screen="progress" setScreen={setScreen} title="Health Progress">
      {/* Score hero */}
      <div className="rounded-3xl p-6 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="opacity-80 text-sm">Weekly Health Score</p>
            <div className="text-6xl font-extrabold mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mockHealthScore.value}<span className="text-3xl opacity-70">/{mockHealthScore.max}</span></div>
            <p className="opacity-80 text-sm mt-1">{mockHealthScore.deltaLabel}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockProgressStats.map(s => (
              <div key={s.label} className="bg-white/20 rounded-xl px-3 py-2 text-center">
                <div className="text-lg">{s.icon}</div>
                <div className="text-sm font-bold">{s.value}</div>
                <div className="text-xs opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Weekly Health Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="progGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BLUE} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: GRAY }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: GRAY }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="score" stroke={BLUE} strokeWidth={2.5} fill="url(#progGrad)" dot={{ fill: BLUE, r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Wellness Breakdown</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-bold text-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Mood Tracking This Week</h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{moods[d.mood - 1]}</span>
                <span className="text-xs font-semibold text-foreground">{d.day}</span>
                <span className="text-xs text-muted-foreground">{moodLabels[d.mood - 1]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// ── SCREEN: Education ────────────────────────────────────────────────────────

function EducationScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [tab, setTab] = useState<"articles" | "videos" | "faqs">("articles");

  const articles = mockArticles;
  const faqs = mockFaqs;

  return (
    <DashboardLayout screen="education" setScreen={setScreen} title="Educational Resources">
      <div className="flex gap-2 mb-5">
        {(["articles", "videos", "faqs"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer capitalize ${
              tab === t ? "text-white" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
            style={tab === t ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}}
          >
            {t === "faqs" ? "FAQs" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "articles" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(a => (
            <Card key={a.title} className="hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <Badge color={a.badge as "blue" | "teal" | "green" | "amber" | "red" | "purple"}>{a.category}</Badge>
                {a.new && <Badge color="green">New</Badge>}
              </div>
              <h3 className="font-bold text-sm text-foreground leading-snug group-hover:text-primary transition" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{a.title}</h3>
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{a.time}</span>
                <span className="ml-auto text-primary font-semibold">Read →</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "videos" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockVideos.map(v => (
            <Card key={v.title} className="p-0 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative">
                <img src={v.thumbnail} alt={v.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{v.duration}</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "faqs" && (
        <div className="max-w-2xl space-y-3">
          {faqs.map((f, i) => (
            <Card key={i}>
              <h3 className="font-bold text-sm text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Info className="w-4 h-4 inline mr-2 text-primary" />{f.q}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

// ── SCREEN: Profile ──────────────────────────────────────────────────────────

function ProfileScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [tab, setTab] = useState<"personal" | "medical" | "settings">("personal");

  return (
    <DashboardLayout screen="profile" setScreen={setScreen} title="My Profile">
      <div className="max-w-3xl">
        {/* Profile header */}
        <Card className="mb-5">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="relative">
              <img
                src={mockUser.avatarUrl}
                alt={mockUser.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mockUser.name}</h2>
              <p className="text-muted-foreground text-sm">{mockUser.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {mockUser.badges.map(b => (
                  <Badge key={b.label} color={b.color}>{b.label}</Badge>
                ))}
              </div>
            </div>
            <Btn variant="ghost" size="sm"><Edit2 className="w-4 h-4" /> Edit Profile</Btn>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(["personal", "medical", "settings"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer capitalize ${
                tab === t ? "text-white" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
              style={tab === t ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "personal" && (
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockUser.personalFields.map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{f.label}</label>
                  <div className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "medical" && (
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockUser.medicalFields.map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{f.label}</label>
                  <div className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "settings" && (
          <Card className="space-y-4">
            {[
              { label: "Medication Reminders", sub: "Get notified when it's time for your medication", state: notifications, set: setNotifications },
              { label: "Appointment Reminders", sub: "Receive alerts 24h before appointments", state: true, set: () => {} },
              { label: "Weekly Health Reports", sub: "Get your health summary every Sunday", state: true, set: () => {} },
              { label: "Dark Mode", sub: "Switch to a darker interface", state: darkMode, set: setDarkMode },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="font-semibold text-sm text-foreground">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
                <button
                  onClick={() => s.set(!s.state)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${s.state ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${s.state ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
            <div className="pt-2">
              <Btn variant="danger" size="sm">Delete Account</Btn>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

// ── SCREEN: Emergency ────────────────────────────────────────────────────────

function EmergencyScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="min-h-screen bg-red-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Red header */}
      <div className="bg-red-600 text-white px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={() => setScreen("dashboard")} className="p-2 rounded-xl bg-red-500 hover:bg-red-400 transition cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              <h1 className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Emergency Support</h1>
            </div>
            <p className="text-sm text-red-200 mt-0.5">If you are in immediate danger, call 911 now</p>
          </div>
          <div className="animate-pulse w-3 h-3 bg-red-300 rounded-full" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
        {/* Emergency call buttons */}
        <div className="grid sm:grid-cols-3 gap-4">
          {mockEmergencyCallOptions.map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.label}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border-2 border-white/20"
                style={{ background: c.color }}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.label}</div>
                  <div className="text-xs opacity-80 whitespace-pre-line mt-0.5">{c.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Warning signs */}
        <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-sm">
          <h2 className="font-bold text-red-800 mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <AlertTriangle className="w-5 h-5" /> Seek Immediate Help If You Experience
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {mockEmergencyWarningSigns.map(s => (
              <div key={s} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-red-800 font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Emergency Guidance */}
        <div className="bg-white rounded-2xl border border-orange-200 p-5 shadow-sm">
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <MessageCircle className="w-5 h-5 text-orange-500" /> AI Emergency Guidance
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Describe your symptoms and get immediate AI guidance while you wait for help.</p>
          <div className="flex gap-2">
            <input
              placeholder="Describe your emergency symptoms..."
              className="flex-1 rounded-xl border border-border bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              className="px-4 py-3 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition cursor-pointer"
            >
              Get Help
            </button>
          </div>
        </div>

        {/* Emergency contacts */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <h2 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Personal Emergency Contacts</h2>
          <div className="space-y-3">
            {mockEmergencyContacts.map(c => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-border">
                <Avatar name={c.name} size={10} />
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.relation} · {c.phone}</div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 transition cursor-pointer">
                  <Phone className="w-3.5 h-3.5" /> Call
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5 inline mr-1" />
          ThyroCare AI emergency guidance is supplemental only. Always call emergency services for life-threatening situations.
        </p>
      </div>
    </div>
  );
}

// ── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");

  const screens: Record<Screen, React.ReactNode> = {
    landing: <LandingScreen setScreen={setScreen} />,
    login: <LoginScreen setScreen={setScreen} />,
    register: <RegisterScreen setScreen={setScreen} />,
    dashboard: <DashboardScreen setScreen={setScreen} />,
    chat: <ChatScreen setScreen={setScreen} />,
    medication: <MedicationScreen setScreen={setScreen} />,
    diet: <DietScreen setScreen={setScreen} />,
    symptoms: <SymptomsScreen setScreen={setScreen} />,
    followup: <FollowupScreen setScreen={setScreen} />,
    progress: <ProgressScreen setScreen={setScreen} />,
    education: <EducationScreen setScreen={setScreen} />,
    profile: <ProfileScreen setScreen={setScreen} />,
    emergency: <EmergencyScreen setScreen={setScreen} />,
  };

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
      {screens[screen]}
    </div>
  );
}
