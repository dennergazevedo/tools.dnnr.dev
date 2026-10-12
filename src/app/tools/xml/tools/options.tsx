"use client";

export const INDENT_OPTIONS = [
  { label: "2 spaces", value: "  " },
  { label: "4 spaces", value: "    " },
  { label: "Tab", value: "\t" },
];

interface IndentSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function IndentSelect({ value, onChange }: IndentSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-zinc-400">
      Indentation
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-border bg-neutral-900/50 py-1.5 pl-3 pr-8 text-sm text-foreground outline-none focus-visible:border-primary"
      >
        {INDENT_OPTIONS.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxOption({ label, checked, onChange }: CheckboxOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="rounded border-border bg-neutral-900/50 text-primary focus:ring-primary/20"
      />
      {label}
    </label>
  );
}
