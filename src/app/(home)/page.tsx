import { Fragment } from "react";
import HomeCard from "./card";

import {
  FileCode2,
  Ampersands,
  AlarmClock,
  ListChecks,
  Layers,
  Code2,
  Image,
  Power,
  GitCompare,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Get Started"
        description="Welcome! Here you will find a curated collection of powerful tools designed to streamline your daily developer workflow."
        icon={Power}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <HomeCard
          icon={ListChecks}
          label="To Do"
          href="/tools/todo"
          description="Organize your tasks and boost your productivity with our cloud-synced todo list."
        />
        <HomeCard
          icon={AlarmClock}
          label="Timer"
          href="/tools/timer"
          description="A precise countdown tool to help you manage your focus sessions effectively."
        />
        <HomeCard
          icon={Code2}
          label="Typescript"
          href="/tools/typescript"
          description="Transform JSON data into clean TypeScript interfaces automatically."
        />
        <HomeCard
          icon={Layers}
          label="CSV • JSON"
          href="/tools/csv"
          description="Seamlessly convert data between CSV and JSON formats with high precision."
        />
        <HomeCard
          icon={Image}
          label="SVG Tools"
          href="/tools/svg"
          description="Convert SVG to PNG, ICO, WebP or React components in seconds."
        />
        <HomeCard
          icon={Ampersands}
          label="Base64"
          href="/tools/base64"
          description="Reliable Base64 encoding and decoding for your data strings."
        />
        <HomeCard
          icon={FileCode2}
          label="URI"
          href="/tools/uri"
          description="Encode and decode URIs to ensure safe data transmission over the web."
        />
        <HomeCard
          icon={GitCompare}
          label="Diff Checker"
          href="/tools/diffchecker"
          description="Compare text versions and identify changes with clear diff highlights."
        />
      </div>
    </div>
  );
}
