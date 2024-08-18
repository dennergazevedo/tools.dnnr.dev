import { LogOut, UserCircle2 } from "lucide-react";
import { Button } from '../ui/button';
import { useAuth } from "@/app/auth/context";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export interface ProfileProps {}

export function Profile() {
  const { user, handleLogout } = useAuth();

  if (!user?.email) {
    return (
      <div className="flex items-center gap-3">
        <UserCircle2 className="h-10 w-10 rounded-full text-zinc-400" />
        <div className="flex flex-col">
          <Link
            href={"/auth/login"}
            className="block text-md font-semibold text-zinc-100"
          >
            Sign In
          </Link>
          <Link href={"/auth/register"} className="block text-sm text-zinc-400 hover:text-zinc-100">
            Do not have account? Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <UserCircle2 className="h-10 w-10 rounded-full text-zinc-400" />
      <div className="flex flex-col">
        <span className="block text-sm font-semibold text-zinc-100">
          {`${user.firstName} ${user.lastName}`}
        </span>
        <span className="block text-sm text-zinc-400">{user.email}</span>
      </div>
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          <LogOut className="h-5 w-5 text-zinc-400" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
          <AlertDialogDescription>
            Your next updates will not be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}
