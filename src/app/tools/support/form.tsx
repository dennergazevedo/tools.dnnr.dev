"use client";
import * as emailjs from "emailjs-com";
import { Loader2, Mail, MessageCircle, Send, User } from "lucide-react";
import { toast } from "sonner";

import * as Input from "../../../components/Form/Input";
import { Textarea } from "@/components/Form/Textarea";
import { Button } from "@/components/Button";
import { useState } from "react";

export default function Form() {
  const [loading, setLoading] = useState<boolean>(false);

  async function sendMail(event: any) {
    event.preventDefault();
    try {
      setLoading(true);
      await emailjs.sendForm(
        String(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID),
        String(process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID),
        event.target,
        String(process.env.NEXT_PUBLIC_EMAIL_USER_ID)
      );
      event.target.reset();
      setLoading(false);
      toast("Success!", {
        description: "Your message has been sent and will be responded to shortly.",
      });
    } catch (err) {
      toast("Unable to send message now", {
        description: "Please try again.",
      });
      setLoading(false);
    }
  }

  return (
    <form
      id="support-form"
      onSubmit={sendMail}
      className="z-10 flex w-full flex-col gap-4 md:w-1/2"
    >
      <Input.Root className="w-auto">
        <Input.Prefix>
          <User className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control name="name" type="text" placeholder="Full Name" />
      </Input.Root>
      <Input.Root className="w-auto">
        <Input.Prefix>
          <Mail className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control name="email" type="text" placeholder="email@example.com" />
      </Input.Root>
      <Input.Root className="w-auto">
        <Input.Prefix>
          <MessageCircle className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control name="subject" type="text" placeholder="Whats is the subject?" />
      </Input.Root>
      <Textarea
        name="message"
        placeholder="Briefly describe your issue or question here..."
      />
      <Button
        type="submit"
        form="support-form"
        variant="primary"
        className="flex flex-row items-center justify-center gap-2 p-4"
        disabled={loading}
      >
        Send
        {loading ? 
        <Loader2 className="h-5 w-5 animate-spin flex-shrink-0 text-white" />
        :
        <Send className="h-5 w-5 flex-shrink-0 text-white" />
      }
      </Button>
    </form>
  );
}
