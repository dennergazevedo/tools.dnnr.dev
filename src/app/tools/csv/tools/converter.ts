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

export function csvToJson(csv: string) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());

  const result = lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.replace(/"/g, '').trim());
    let obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
      if (header === 'year') {
        obj[header] = parseInt(obj[header], 10);
      } else if (header === 'US_peak_chart_post' && obj[header] !== '-') {
        obj[header] = parseInt(obj[header], 10);
      }
    });
    return obj;
  });

  return JSON.stringify(result);
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