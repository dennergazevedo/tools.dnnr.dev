import * as XLSX from "xlsx";

export async function sheetToJson(fileOrBuffer: File | ArrayBuffer | string): Promise<string> {
  let workbook: XLSX.WorkBook;

  // Use codepage: 65001 to properly read UTF-8 formatted CSV/ODS
  const readOpts: XLSX.ParsingOptions = { type: "array", codepage: 65001 };

  if (fileOrBuffer instanceof File) {
    const buffer = await fileOrBuffer.arrayBuffer();
    workbook = XLSX.read(buffer, readOpts);
  } else if (fileOrBuffer instanceof ArrayBuffer) {
    workbook = XLSX.read(fileOrBuffer, readOpts);
  } else if (typeof fileOrBuffer === "string") {
    // Treat string as CSV or TSV string, or base64 encoded string
    workbook = XLSX.read(fileOrBuffer, { type: "string", codepage: 65001 });
  } else {
    throw new Error("Unsupported input type");
  }

  // Get first sheet
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  return JSON.stringify(jsonData, null, 2);
}

export function jsonToSheet(jsonString: string, format: XLSX.BookType): ArrayBuffer {
  const data = JSON.parse(jsonString);

  if (!Array.isArray(data)) {
    throw new Error("Input JSON must be an array of objects");
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  if (format === "csv") {
    // Generate CSV string and add UTF-8 BOM so Excel opens it correctly
    const csvStr = XLSX.write(workbook, { bookType: format, type: "string" });
    const encoder = new TextEncoder();
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM
    const encoded = encoder.encode(csvStr);
    
    // Concat BOM and the string bytes
    const result = new Uint8Array(bom.length + encoded.length);
    result.set(bom, 0);
    result.set(encoded, bom.length);
    return result.buffer;
  }

  // Output format, e.g., 'xlsx', 'ods', etc (ArrayBuffer natively encodes them fine)
  const arrayBuffer = XLSX.write(workbook, { bookType: format, type: "array" });
  return arrayBuffer;
}

export function downloadFile(filename: string, fileContent: string | ArrayBuffer, type: string) {
  const blob = new Blob([fileContent], { type });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}