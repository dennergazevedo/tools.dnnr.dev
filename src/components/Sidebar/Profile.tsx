import { LogOut, UserCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/app/auth/context";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export interface ProfileProps {}

export function Profile() {
  const { user, handleLogout } = useAuth();

  if (!user?.email) {
    return (
      <div className="flex items-center gap-3 p-1">
        <UserCircle2 className="h-10 w-10 text-muted-foreground" />
        <div className="flex flex-col">
          <Link
            href={"/auth/login"}
            className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Sign In
          </Link>
          <Link
            href={"/auth/register"}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-1">
      <UserCircle2 className="h-10 w-10 text-muted-foreground" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-foreground">
          {`${user.firstname} ${user.lastname}`}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-border bg-neutral-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Your next updates will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border bg-transparent hover:bg-neutral-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-red-600"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
