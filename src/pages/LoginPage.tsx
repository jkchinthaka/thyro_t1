import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Star } from "lucide-react";
import { Btn, Input, BrandLogo } from "@/components/common";
import { BLUE, TEAL } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { mockUser } from "@/data/mock";
import { loginSchema, type LoginFormValues } from "@/schemas/authSchemas";
import { useToast } from "@/hooks/useToast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SkipLink } from "@/layouts/Sidebar";

export function LoginPage() {
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { success } = useToast();

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: mockUser.email,
      password: mockUser.passwordPlaceholder,
      remember: false,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    void values;
    login();
    success("Signed in successfully");
    navigate(from && from !== ROUTES.LOGIN ? from : ROUTES.DASHBOARD, { replace: true });
  };

  const onInvalid = () => {
    if (errors.email) setFocus("email");
    else if (errors.password) setFocus("password");
  };

  return (
    <>
      <SkipLink />
      <div
        className="min-h-screen bg-background grid lg:grid-cols-2"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="flex flex-col justify-center px-6 sm:px-8 py-12 max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              <BrandLogo size="md" />
              <span
                className="font-bold text-lg text-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                ThyroCare AI
              </span>
            </div>
            <h1
              className="text-3xl font-bold text-foreground mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Welcome back
            </h1>
            <p className="text-muted-foreground">Continue your recovery journey</p>
          </div>

          <form
            id="main-content"
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            noValidate
          >
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              icon={<User className="w-4 h-4" />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" {...register("remember")} />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-primary hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <Btn className="w-full justify-center" size="lg" type="submit">
              Sign In
            </Btn>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-border bg-white hover:bg-gray-50 transition text-sm font-semibold text-foreground cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-muted-foreground">
              No account?{" "}
              <button
                type="button"
                onClick={() => navigate(ROUTES.REGISTER)}
                className="font-semibold text-primary hover:underline cursor-pointer"
              >
                Create one
              </button>
            </p>
          </form>
        </div>

        <div className="hidden lg:block relative overflow-hidden rounded-l-3xl m-4">
          <img
            src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&h=900&fit=crop&auto=format"
            alt="Healthcare and recovery"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${BLUE}88 0%, ${TEAL}aa 100%)` }}
          />
          <div className="absolute bottom-12 left-8 right-8 text-white">
            <p
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              &ldquo;ThyroCare AI transformed my recovery experience completely.&rdquo;
            </p>
            <p className="opacity-80 text-sm">
              — Sarah M., Thyroid Cancer Survivor, 18 months post-surgery
            </p>
            <div className="flex gap-1 mt-3" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-current text-yellow-300" aria-hidden="true" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
