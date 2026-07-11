import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Card, Btn, Input, BrandLogo } from "@/components/common";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { registerSchema, type RegisterFormValues } from "@/schemas/authSchemas";
import { useToast } from "@/hooks/useToast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SkipLink } from "@/layouts/Sidebar";

export function RegisterPage() {
  useDocumentTitle("Register");
  const navigate = useNavigate();
  const { register: mockRegister } = useAuth();
  const { success } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "female",
      surgeryDate: "2023-09-15",
      consent: false,
    },
  });

  const onSubmit = () => {
    mockRegister();
    success("Account created successfully");
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  const onInvalid = () => {
    const order: (keyof RegisterFormValues)[] = [
      "fullName",
      "email",
      "password",
      "confirmPassword",
      "age",
      "surgeryDate",
      "rai",
      "consent",
    ];
    for (const key of order) {
      if (errors[key]) {
        setFocus(key);
        break;
      }
    }
  };

  return (
    <>
      <SkipLink />
      <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => navigate(ROUTES.HOME)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Back
            </button>
          </div>
          <div className="text-center mb-8">
            <BrandLogo size="lg" className="mx-auto mb-4" />
            <h1
              className="text-3xl font-bold text-foreground mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Create Your Account
            </h1>
            <p className="text-muted-foreground">
              Join ThyroCare AI and take control of your recovery
            </p>
          </div>
          <Card>
            <form
              id="main-content"
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Sarah Johnson"
                  autoComplete="name"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="sarah@email.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  error={errors.password?.message}
                  {...register("password")}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
                <Input
                  label="Age"
                  type="number"
                  placeholder="35"
                  error={errors.age?.message}
                  {...register("age")}
                />
                <div className="space-y-1.5">
                  <span className="block text-sm font-semibold text-foreground" id="gender-label">
                    Gender
                  </span>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-2" role="radiogroup" aria-labelledby="gender-label">
                        {(["female", "male", "other"] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => field.onChange(g)}
                            aria-pressed={field.value === g}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold border capitalize transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                              field.value === g
                                ? "border-primary bg-blue-50 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="surgeryDate"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Date of Surgery
                  </label>
                  <input
                    id="surgeryDate"
                    type="date"
                    className={`w-full rounded-xl border bg-input-background py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${
                      errors.surgeryDate ? "border-red-400" : "border-border"
                    }`}
                    aria-invalid={Boolean(errors.surgeryDate)}
                    aria-describedby={errors.surgeryDate ? "surgeryDate-error" : undefined}
                    {...register("surgeryDate")}
                  />
                  {errors.surgeryDate ? (
                    <p id="surgeryDate-error" className="text-xs text-red-600" role="alert">
                      {errors.surgeryDate.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-1.5">
                  <span className="block text-sm font-semibold text-foreground" id="rai-label">
                    Radioactive Iodine Treatment
                  </span>
                  <Controller
                    name="rai"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-2" role="radiogroup" aria-labelledby="rai-label">
                        {(
                          [
                            ["yes", "Yes, I had RAI"],
                            ["no", "No RAI treatment"],
                          ] as const
                        ).map(([val, label]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => field.onChange(val)}
                            aria-pressed={field.value === val}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                              field.value === val
                                ? "border-primary bg-blue-50 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.rai ? (
                    <p className="text-xs text-red-600" role="alert">
                      {errors.rai.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded" {...register("consent")} />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <span className="text-primary font-semibold">Terms of Service</span> and{" "}
                    <span className="text-primary font-semibold">Privacy Policy</span>
                  </span>
                </label>
                {errors.consent ? (
                  <p className="text-xs text-red-600" role="alert">
                    {errors.consent.message}
                  </p>
                ) : null}
                <Btn className="w-full justify-center" size="lg" type="submit">
                  Create Account <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Btn>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN)}
                    className="font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
