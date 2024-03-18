import { Button } from '@mui/material';
import React from 'react';
import XLSX from 'xlsx';

const ExcelDownloadButton = ({ data, filename }) => {
  const downloadExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Add a worksheet with your data
    const ws = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate a blob containing the Excel file data
    const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger a click event to start the download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={downloadExcel}>Download Excel</Button>
  );
};

export default ExcelDownloadButton;
