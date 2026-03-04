export async function svgToImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function convertSvgToImage(
  svgString: string,
  format: "image/png" | "image/webp"
): Promise<string> {
  const img = await svgToImage(svgString);
  const canvas = document.createElement("canvas");
  canvas.width = img.width || 512;
  canvas.height = img.height || 512;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(format);
}

// Simple ICO conversion: just return PNG DataURL for now as browsers don't natively support encoding ICO
// and most modern systems accept PNG as favicon. But to be thorough, we can wrap it.
// Actually, simple way is to use PNG and call it .ico, but that's not formal.
// For a client-side tool without heavy deps, we'll use PNG as the base.
export async function convertSvgToIco(svgString: string): Promise<string> {
  return convertSvgToImage(svgString, "image/png");
}

export function svgToReactFC(
  svgString: string,
  componentName: string = "Icon"
): string {
  // Clean up SVG for React
  let cleanSvg = svgString
    .replace(/class=/g, "className=")
    .replace(/for=/g, "htmlFor=")
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/clip-rule=/g, "clipRule=")
    .replace(/stop-color=/g, "stopColor=")
    .replace(/stop-opacity=/g, "stopOpacity=")
    .replace(/xmlns:xlink=/g, "xmlnsXlink=")
    .replace(/xlink:href=/g, "xlinkHref=");

  // Extract inner content if it's a full SVG tag
  const svgMatch = cleanSvg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  const innerContent = svgMatch ? svgMatch[1] : cleanSvg;
  const attrMatch = cleanSvg.match(/<svg([^>]*)>/i);
  const attributes = attrMatch ? attrMatch[1] : "";

  return `import React from 'react';

export const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg ${attributes} {...props}>
    ${innerContent.trim()}
  </svg>
);

export default ${componentName};`;
}

export function downloadDataUrl(filename: string, dataUrl: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
