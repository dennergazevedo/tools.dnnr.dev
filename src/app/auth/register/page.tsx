import { Fragment } from "react";
import * as Input from "../../../components/Form/Input";
import { Lock, Mail, Shield, ShieldCheck, User, UserCog } from "lucide-react";
import { Button } from "@/components/Button";

export default function Register() {
  return (
    <Fragment>
      <div className="flex w-full flex-col items-center gap-2">
        <h1 className="flex flex-row items-center gap-2 text-2xl font-medium">
          <Lock className="h-5 w-5 text-zinc-500" />
          Registration
        </h1>
        <span className="text-zinc-400">
          Sign up and make the most of the tools
        </span>
      </div>
      <form
        id="register"
        className="mt-8 flex w-96 flex-col gap-2 rounded-lg border border-zinc-500 bg-zinc-700/10 px-8 py-12 pb-8"
      >
        <Input.Root className="w-auto">
          <Input.Prefix>
            <User className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control
            name="firstName"
            type="text"
            placeholder="First Name"
          />
        </Input.Root>
        <Input.Root className="w-auto">
          <Input.Prefix>
            <UserCog className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control name="lastName" type="text" placeholder="Last Name" />
        </Input.Root>
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
            <Shield className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control
            name="password"
            type="password"
            placeholder="Your password"
          />
        </Input.Root>
        <Input.Root className="w-auto">
          <Input.Prefix>
            <ShieldCheck className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control
            name="password"
            type="password"
            placeholder="Confirm your password"
          />
        </Input.Root>
        <div className="mt-6 flex flex-col items-center gap-2">
          <Button
            type="submit"
            form="register"
            variant="primary"
            className="flex w-full flex-row items-center justify-center gap-4 py-4"
          >
            Register
          </Button>
          <Button
            type="submit"
            form="register"
            variant="ghost"
            className="flex w-full flex-row items-center justify-center gap-4 py-4"
          >
            Back
          </Button>
        </div>
      </form>
    </Fragment>
  );
}
