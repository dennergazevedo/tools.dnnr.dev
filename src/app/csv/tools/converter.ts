export function jsonToCSV(jsonData: Array<any>) {
  const headers = Object.keys(jsonData[0]);
  const csvRows = [];
  
  csvRows.push(headers.join(','));

  for (const row of jsonData) {
      const values = headers.map(header => {
          const escaped = ('' + row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}

export function downloadFile(filename: string, fileContent: any, type: string) {
  const blob = new Blob([fileContent], { type });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}