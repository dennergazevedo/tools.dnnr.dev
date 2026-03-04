import { MenuTabs } from "./tabs";

export const metadata = {
  title: "SVG Tools - Tools",
  description: "Convert SVG to PNG, ICO, WebP and React components",
};

export default function SvgToolPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-zinc-100">SVG Tools</h1>
      <p className="text-zinc-400">
        Convert your SVG files to different formats or React components easily.
      </p>

      <MenuTabs />
    </div>
  );
}
