import React from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const DownloadCsv = () => {
  const data = useSelector((state) => state.expense.expenses);

  const convertArrayToCSV = (data) => {
    const headers = Object.keys(data[0])
      .filter((key) => key !== "id")
      .join(",");
    const rows = data.map((item) =>
      Object.keys(item)
        .filter((key) => key !== "id")
        .map((key) => item[key])
        .join(",")
    );
    return `${headers}\n${rows.join("\n")}`;
  };

  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Expenses.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    const csvContent = convertArrayToCSV(data);
    downloadCSV(csvContent);
  };

  return (
    <Container className="text-center">
      <Button variant="success" onClick={handleDownload}>
        Download Expenses as CSV
      </Button>
    </Container>
  );
};

export default DownloadCsv;
