import { Fragment } from "react";
import HomeCard from "./card";

import {
  FileCode2,
  Ampersands,
  AlarmClock,
  ListChecks,
  Layers,
  Code2,
} from "lucide-react";

export default function Home() {
  return (
    <Fragment>
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Get Started
      </h1>
      <div className="mt-6 flex flex-col">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Welcome!
            </h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Here you will find some useful tools for your daily life as a
              Developer.
            </span>
          </div>
        </div>
        <div className="mt-20 flex flex-row flex-wrap gap-4">
          <HomeCard
            icon={ListChecks}
            label="To Do"
            href="/todo"
            description='A "To Do" is a list or task management tool used to organize and keep track of tasks or activities that need to be completed. '
          />
          <HomeCard
            icon={AlarmClock}
            label="Timer"
            href="/"
            description="A timer is a device or tool that measures and counts down a specific amount of time"
          />
          <HomeCard
            icon={Code2}
            label="Typescript"
            href="/typescript"
            description="A JSON to TypeScript interface converter is a tool that automatically generates TypeScript interface definitions from JSON data."
          />
          <HomeCard
            icon={Layers}
            label="CSV • JSON"
            href="/csv"
            description="A CSV to JSON and JSON to CSV converter is a tool that transforms data between CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) formats."
          />
          <HomeCard
            icon={Ampersands}
            label="Base64"
            href="/base64"
            description="A Base64 encoder and decoder is a tool that converts data to and from Base64 encoding. "
          />
          <HomeCard
            icon={FileCode2}
            label="URI"
            href="/uri"
            description="A URI encoder and decoder is a tool that converts characters in a Uniform Resource Identifier (URI) into a format that can be transmitted over the internet."
          />
        </div>
      </div>
    </Fragment>
  );
}
