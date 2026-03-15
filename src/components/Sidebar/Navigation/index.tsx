import {
  FileCode2,
  Ampersands,
  AlarmClock,
  Bookmark,
  ListChecks,
  Layers,
  Code2,
  Image,
  GitCompare,
  Palette,
  Sparkles,
} from "lucide-react";

import { NavItem } from "./NavItem";

interface NavigationProps {
  onClose?: () => void;
}

export function Navigation({ onClose }: NavigationProps) {
  return (
    <nav className="flex flex-col gap-0.5">
      {/* <NavItem icon={Home} title="Home" to="/" onClose={onClose} /> */}
      <NavItem
        icon={ListChecks}
        title="To Do"
        to="/tools/todo"
        onClose={onClose}
      />
      <NavItem
        icon={Bookmark}
        title="Bookmarks"
        to="/tools/bookmark"
        onClose={onClose}
      />
      <NavItem
        icon={AlarmClock}
        title="Timer"
        to="/tools/timer"
        onClose={onClose}
      />
      <NavItem icon={Code2} title="JSON" to="/tools/json" onClose={onClose} />
      <NavItem
        icon={GitCompare}
        title="Diff Checker"
        to="/tools/diffchecker"
        onClose={onClose}
      />
      <NavItem
        icon={Image}
        title="SVG Tools"
        to="/tools/svg"
        onClose={onClose}
      />
      <NavItem
        icon={Palette}
        title="Color Picker"
        to="/tools/color-picker"
        onClose={onClose}
      />
      <NavItem
        icon={AlarmClock}
        title="Cron Generator"
        to="/tools/cron"
        onClose={onClose}
      />
      <NavItem
        icon={Sparkles}
        title="Generators"
        to="/tools/generators"
        onClose={onClose}
      />

      <NavItem icon={FileCode2} title="URI" to="/tools/uri" onClose={onClose} />
      <NavItem
        icon={Ampersands}
        title="Base64"
        to="/tools/base64"
        onClose={onClose}
      />
      <NavItem
        icon={Layers}
        title="Spreadsheet"
        to="/tools/spreadsheet"
        onClose={onClose}
      />
    </nav>
  );
}
