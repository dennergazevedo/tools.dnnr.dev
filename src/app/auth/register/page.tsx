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
import { toast } from "sonner";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const { handleRegister } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      setLoading(true);
      try {
        const formData = new FormData(event.target);

        const user = {
          firstname: String(formData.get("firstname")),
          lastname: String(formData.get("lastname")),
          email: String(formData.get("email")),
          password: String(formData.get("password")),
        };

        if (
          user?.email?.length < 8 ||
          user?.lastname?.length < 3 ||
          user?.firstname?.length < 3 ||
          user.password.length < 8
        ) {
          toast("Oops!", {
            description: "Verify your data and try again.",
          });
          setLoading(false);
          return;
        }

        const success = await handleRegister(user);

        if (success) {
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
          setSuccess(true);
        }
      } catch (error) {
        console.log("[!] Register Submit", error);
      }
      setLoading(false);
    },
    [router]
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-highlight">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Join us today
          </h1>
          <p className="text-muted-foreground">
            Create your account to start organizing your work
          </p>
        </div>

        <form
          id="register"
          onSubmit={handleSubmit}
          className="w-full space-y-4 rounded-2xl border border-border bg-neutral-900/50 p-8 shadow-premium"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-foreground">
                First name
              </label>
              <Input.Root>
                <Input.Prefix>
                  <User className="h-4 w-4 text-muted-foreground" />
                </Input.Prefix>
                <Input.Control
                  name="firstname"
                  type="text"
                  placeholder="John"
                  required
                />
              </Input.Root>
            </div>
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-foreground">
                Last name
              </label>
              <Input.Root>
                <Input.Prefix>
                  <UserCog className="h-4 w-4 text-muted-foreground" />
                </Input.Prefix>
                <Input.Control
                  name="lastname"
                  type="text"
                  placeholder="Doe"
                  required
                />
              </Input.Root>
            </div>
          </div>

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
                placeholder="john@example.com"
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
                <Lock className="h-4 w-4 text-muted-foreground" />
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
              {success ? "Welcome!" : "Create Account"}
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
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary transition-colors hover:text-amber-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
