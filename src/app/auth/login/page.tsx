"use client";
import { Fragment, useCallback, useState } from "react";
import * as Input from "../../../components/Form/Input";
import {
  CheckCircle,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../context";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const { handleLogin } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      setLoading(true);
      try {
        const formData = new FormData(event.target);

        const success = await handleLogin({
          email: String(formData.get("email")),
          password: String(formData.get("password")),
        });

        if (success) {
          setTimeout(() => {
            router.push("/");
          }, 3000);
          setSuccess(true);
        }
      } catch (error) {
        console.log("[!] Login Submit", error);
      }
      setLoading(false);
    },
    [router]
  );

  return (
    <Fragment>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-highlight">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            id="signin"
            onSubmit={handleSubmit}
            className="w-full space-y-4 rounded-2xl border border-border bg-neutral-900/50 p-8 shadow-premium"
          >
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-foreground">
                Email
              </label>
              <Input.Root>
                <Input.Prefix>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </Input.Prefix>
                <Input.Control
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Input.Root>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-foreground">
                Password
              </label>
              <Input.Root>
                <Input.Prefix>
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </Input.Prefix>
                <Input.Control
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </Input.Root>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant={success ? "success" : "primary"}
                loading={loading}
                disabled={success || loading}
                className="h-12 w-full text-base font-bold transition-all"
              >
                {success ? <CheckCircle className="mr-2 h-5 w-5" /> : null}
                {success ? "Success!" : "Sign In"}
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Go back
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-primary transition-colors hover:text-amber-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
