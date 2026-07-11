import { useState } from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Card, Btn, Input, BrandLogo } from "@/components/common";
import { BLUE, TEAL } from "@/constants/colors";
import type { SetScreen } from "@/types";

export function RegisterPage({ setScreen }: { setScreen: SetScreen }) {
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
          <BrandLogo size="lg" className="mx-auto mb-4" />
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
