import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportFuelRateHistoryExcel = (history) => {

  const excelData = history.map((item) => ({
    Fuel: item.fuel,
    "Old Rate": item.oldRate,
    "New Rate": item.newRate,
    "Updated By": item.updatedBy,
    Date: item.updatedDate,
    Time: item.updatedTime,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Fuel Rate History"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Fuel_Rate_History.xlsx");
};