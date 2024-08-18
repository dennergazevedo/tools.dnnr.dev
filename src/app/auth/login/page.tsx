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
import { Button } from "@/components/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/utils/request";
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
      <div className="flex w-full flex-col items-center gap-2">
        <h1 className="flex flex-row items-center gap-2 text-2xl font-medium">
          <Lock className="h-5 w-5 text-zinc-500" />
          Sign in
        </h1>
        <span className="text-zinc-400">
          Sign in and make the most of the tools
        </span>
      </div>
      <form
        id="signin"
        onSubmit={handleSubmit}
        className="mt-8 flex w-96 flex-col gap-2 rounded-lg border border-zinc-500 bg-zinc-700/10 px-8 py-12 pb-8"
      >
        <Input.Root className="w-auto">
          <Input.Prefix>
            <Mail className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control
            name="email"
            type="email"
            placeholder="email@example.com"
          />
        </Input.Root>
        <Input.Root className="w-auto">
          <Input.Prefix>
            <ShieldCheck className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control
            name="password"
            type="password"
            placeholder="********"
          />
        </Input.Root>
        <div className="mt-6 flex flex-col items-center gap-2">
          <Button
            type="submit"
            form="signin"
            variant={success ? "success" : "primary"}
            loading={loading}
            disabled={success || loading}
            className="flex w-full flex-row items-center justify-center gap-4 py-4"
          >
            {success ? (
              <CheckCircle className="h-5 w-5 text-white" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Button
            type='button'
            variant="ghost"
            onClick={() => router.back()}
            className="flex w-full flex-row items-center justify-center gap-4 py-4"
          >
            Back
          </Button>
        </div>
      </form>
      <Link
        href={"/auth/register"}
        className="mt-4 block text-sm text-zinc-400 hover:text-zinc-100"
      >
        Do not have account? Sign Up
      </Link>
    </Fragment>
  );
}
