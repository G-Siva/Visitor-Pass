const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const DATA_FOLDER = path.join(__dirname, "data");
const FILE_PATH = path.join(DATA_FOLDER, "visitors.xlsx");

if (!fs.existsSync(DATA_FOLDER)) {
  fs.mkdirSync(DATA_FOLDER);
}

app.post("/save-visitor", (req, res) => {

  try {

    const form = req.body;

    let workbook;
    let worksheet;
    let data = [];

    // Read existing file
    if (fs.existsSync(FILE_PATH)) {

      workbook = XLSX.readFile(FILE_PATH);

      worksheet = workbook.Sheets["Visitors"];

      data = XLSX.utils.sheet_to_json(worksheet);
    }

    // Convert materials array into readable string
    const materialsText = (form.materials || [])
      .map((m, index) =>
        `${index + 1}. ${m.desc} (Qty: ${m.qty})`
      )
      .join(" | ");

    // Add new row
    data.push({

      VisitorsNumber: form.visitorsNumber,
      VisitorName: form.visitorName,
      VisitorType: form.visitorType,
      VisitorCompany: form.visitorCompany,
      Address: form.address,
      ToMeet: form.toMeet,
      PouchId: form.pouchId,
      AreaOfVisit: form.areaOfVisit,
      MobileModel: form.mobileModel,
      MobileNumber: form.mobileNumber,
      VehicleNumber: form.vehicleNumber,
      SafetySlogan: form.safetySlogan,
      Purpose: form.purpose,
      Remarks: form.remarks,
      PassFrom: form.passFrom,
      PassTo: form.passTo,
      MarkOut: form.markOut ? "YES" : "NO",

      Materials: materialsText,

      SavedAt: new Date().toLocaleString()

    });

    // Create worksheet
    worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    workbook = XLSX.utils.book_new();

    // Append worksheet
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Visitors"
    );

    // Save Excel file
    XLSX.writeFile(workbook, FILE_PATH);

    res.json({
      success: true,
      message: "Visitor saved successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error saving visitor"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});