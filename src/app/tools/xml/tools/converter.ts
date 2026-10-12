// XML helpers built on top of the browser's native DOMParser.
// Conventions used for XML <-> JSON:
//   - attributes are prefixed with "@"            -> { "@id": "1" }
//   - mixed/attributed text content is "#text"     -> { "@id": "1", "#text": "foo" }
//   - repeated sibling elements become arrays      -> { "item": ["a", "b"] }
//   - elements with only text become plain values  -> { "name": "John" }

export const ATTR_PREFIX = "@";
export const TEXT_KEY = "#text";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export function parseXml(xml: string): Document {
  const doc = new DOMParser().parseFromString(xml.trim(), "application/xml");
  const parserError = doc.getElementsByTagName("parsererror")[0];
  if (parserError) {
    const message = (parserError.textContent ?? "Invalid XML")
      .replace(/^This page contains the following errors:/, "")
      .replace(/Below is a rendering of the page.*$/s, "")
      .trim();
    throw new Error(message || "Invalid XML");
  }
  return doc;
}

const escapeText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeAttr = (value: string) =>
  escapeText(value).replace(/"/g, "&quot;");

/* -------------------------------------------------------------------------- */
/*                                  Beautify                                  */
/* -------------------------------------------------------------------------- */

function getDeclaration(xml: string) {
  const match = xml.trim().match(/^<\?xml[\s\S]*?\?>/);
  return match ? match[0] : null;
}

function serializeAttributes(element: Element) {
  return Array.from(element.attributes)
    .map((attr) => ` ${attr.name}="${escapeAttr(attr.value)}"`)
    .join("");
}

function formatNode(node: Node, indent: string, depth: number): string[] {
  const pad = indent.repeat(depth);

  switch (node.nodeType) {
    case Node.ELEMENT_NODE: {
      const element = node as Element;
      const open = `<${element.tagName}${serializeAttributes(element)}`;
      const children = Array.from(element.childNodes).filter(
        (child) =>
          !(child.nodeType === Node.TEXT_NODE && !child.nodeValue?.trim())
      );

      if (children.length === 0) return [`${pad}${open}/>`];

      // Keep short text-only elements on a single line
      if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
        const text = escapeText(children[0].nodeValue!.trim());
        return [`${pad}${open}>${text}</${element.tagName}>`];
      }

      return [
        `${pad}${open}>`,
        ...children.flatMap((child) => formatNode(child, indent, depth + 1)),
        `${pad}</${element.tagName}>`,
      ];
    }
    case Node.TEXT_NODE:
      return [`${pad}${escapeText(node.nodeValue!.trim())}`];
    case Node.CDATA_SECTION_NODE:
      return [`${pad}<![CDATA[${node.nodeValue}]]>`];
    case Node.COMMENT_NODE:
      return [`${pad}<!--${node.nodeValue}-->`];
    case Node.PROCESSING_INSTRUCTION_NODE: {
      const pi = node as ProcessingInstruction;
      return [`${pad}<?${pi.target} ${pi.data}?>`];
    }
    case Node.DOCUMENT_TYPE_NODE: {
      const doctype = node as DocumentType;
      const ids = doctype.publicId
        ? ` PUBLIC "${doctype.publicId}" "${doctype.systemId}"`
        : doctype.systemId
          ? ` SYSTEM "${doctype.systemId}"`
          : "";
      return [`${pad}<!DOCTYPE ${doctype.name}${ids}>`];
    }
    default:
      return [];
  }
}

export function beautifyXml(xml: string, indent = "  "): string {
  const doc = parseXml(xml);
  const declaration = getDeclaration(xml);
  const lines = Array.from(doc.childNodes).flatMap((node) =>
    formatNode(node, indent, 0)
  );
  return [declaration, ...lines].filter(Boolean).join("\n");
}

export function minifyXml(xml: string): string {
  const doc = parseXml(xml);
  const declaration = getDeclaration(xml);
  const lines = Array.from(doc.childNodes).flatMap((node) =>
    formatNode(node, "", 0)
  );
  return [declaration, ...lines].filter(Boolean).join("");
}

/* -------------------------------------------------------------------------- */
/*                                 XML -> JSON                                */
/* -------------------------------------------------------------------------- */

interface XmlToJsonOptions {
  parseValues?: boolean;
}

function castValue(value: string, parseValues: boolean): JsonValue {
  if (!parseValues) return value;
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(value)) {
    const num = Number(value);
    if (Number.isSafeInteger(num) || !Number.isInteger(num)) return num;
  }
  return value;
}

function elementToJson(element: Element, parseValues: boolean): JsonValue {
  const result: { [key: string]: JsonValue } = {};

  for (const attr of Array.from(element.attributes)) {
    result[`${ATTR_PREFIX}${attr.name}`] = castValue(attr.value, parseValues);
  }

  let text = "";
  for (const child of Array.from(element.childNodes)) {
    if (
      child.nodeType === Node.TEXT_NODE ||
      child.nodeType === Node.CDATA_SECTION_NODE
    ) {
      text += child.nodeValue ?? "";
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const childElement = child as Element;
      const key = childElement.tagName;
      const value = elementToJson(childElement, parseValues);

      if (key in result) {
        const current = result[key];
        result[key] = Array.isArray(current)
          ? [...current, value]
          : [current, value];
      } else {
        result[key] = value;
      }
    }
  }

  text = text.trim();
  const hasKeys = Object.keys(result).length > 0;

  if (!hasKeys) return text ? castValue(text, parseValues) : null;
  if (text) result[TEXT_KEY] = castValue(text, parseValues);
  return result;
}

export function xmlToJson(
  xml: string,
  { parseValues = false }: XmlToJsonOptions = {}
): string {
  const root = parseXml(xml).documentElement;
  const json = { [root.tagName]: elementToJson(root, parseValues) };
  return JSON.stringify(json, null, 2);
}

/* -------------------------------------------------------------------------- */
/*                                 JSON -> XML                                */
/* -------------------------------------------------------------------------- */

interface JsonToXmlOptions {
  rootName?: string;
  indent?: string;
  declaration?: boolean;
}

function sanitizeTagName(name: string) {
  let tag = name.replace(/[^\w.:-]/g, "_");
  if (!/^[A-Za-z_:]/.test(tag)) tag = `_${tag}`;
  return tag;
}

function valueToXml(
  name: string,
  value: JsonValue,
  indent: string,
  depth: number
): string[] {
  const tag = sanitizeTagName(name);
  const pad = indent.repeat(depth);

  if (Array.isArray(value)) {
    return value.flatMap((item) => valueToXml(name, item, indent, depth));
  }

  if (value === null || value === undefined) return [`${pad}<${tag}/>`];

  if (typeof value !== "object") {
    return [`${pad}<${tag}>${escapeText(String(value))}</${tag}>`];
  }

  let attributes = "";
  let text: string | null = null;
  const children: string[] = [];

  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith(ATTR_PREFIX)) {
      const attrName = sanitizeTagName(key.slice(ATTR_PREFIX.length));
      attributes += ` ${attrName}="${escapeAttr(String(child ?? ""))}"`;
    } else if (key === TEXT_KEY) {
      text = escapeText(String(child ?? ""));
    } else {
      children.push(...valueToXml(key, child, indent, depth + 1));
    }
  }

  if (children.length === 0) {
    return text === null
      ? [`${pad}<${tag}${attributes}/>`]
      : [`${pad}<${tag}${attributes}>${text}</${tag}>`];
  }

  return [
    `${pad}<${tag}${attributes}>`,
    ...(text === null ? [] : [`${pad}${indent}${text}`]),
    ...children,
    `${pad}</${tag}>`,
  ];
}

export function jsonToXml(
  json: string,
  { rootName = "root", indent = "  ", declaration = true }: JsonToXmlOptions = {}
): string {
  const data = JSON.parse(json) as JsonValue;

  // A single-key object (that isn't an attribute/text) becomes the root element
  const isObject =
    data !== null && typeof data === "object" && !Array.isArray(data);
  const keys = isObject ? Object.keys(data) : [];
  const singleRoot =
    isObject &&
    keys.length === 1 &&
    !keys[0].startsWith(ATTR_PREFIX) &&
    keys[0] !== TEXT_KEY &&
    !Array.isArray((data as Record<string, JsonValue>)[keys[0]]);

  const lines = singleRoot
    ? valueToXml(keys[0], (data as Record<string, JsonValue>)[keys[0]], indent, 0)
    : Array.isArray(data)
      ? valueToXml(rootName, { item: data }, indent, 0)
      : valueToXml(rootName, data, indent, 0);

  const header = declaration ? ['<?xml version="1.0" encoding="UTF-8"?>'] : [];
  return [...header, ...lines].join("\n");
}
