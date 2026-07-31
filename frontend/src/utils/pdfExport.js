import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportFuelRateHistoryPDF = (history) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("PETROL BUNK MANAGEMENT SYSTEM", 14, 18);

  doc.setFontSize(14);
  doc.text("Fuel Rate History Report", 14, 28);

  // Date
  doc.setFontSize(10);
  doc.text(
    `Generated On : ${new Date().toLocaleString()}`,
    14,
    36
  );

  autoTable(doc, {
    startY: 45,

    head: [[
      "Fuel",
      "Old Rate",
      "New Rate",
      "Updated By",
      "Date",
      "Time"
    ]],

    body: history.map((item) => [
      item.fuel,
      item.oldRate,
      item.newRate,
      item.updatedBy,
      item.date,
      item.time
    ]),

    styles: {
      fontSize: 10,
      halign: "center",
      valign: "middle",
    },

    headStyles: {
      fillColor: [25, 118, 210],
      textColor: 255,
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  doc.save("Fuel_Rate_History.pdf");
};