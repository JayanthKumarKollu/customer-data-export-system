const { model } = require("mongoose");
const ExcelJS = require("exceljs");
const userDetails = require("../Models/userDetails");
const userHeaders = require("../Common/userHeaders");

const exportExcel = async (req, res) => {
  try {
    const users = await userDetails.find().lean();

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Users");

    // worksheet.columns = [

    //   {
    //     header:'Name',
    //     key:'name',
    //     width:20
    //   },

    //   {
    //     header:'Phone Number',
    //     key:'phoneNumber',
    //     width:30
    //   },

    //   {
    //     header:'Reason',
    //     key:'reasonForVisit',
    //     width:10
    //   }

    // ];

    worksheet.columns = Object.keys(users[0])

      .filter((key) => key !== "_id" && key !== "__v")

      .map((key) => ({
        // header: key.charAt(0).toUpperCase() + key.slice(1),
        header: userHeaders[key],

        key: key,

        width: 20,
      }));
    // users.forEach((user) => {
    //   worksheet.addRow({
    //     name: user.name,
    //     phoneNumber: user.phoneNumber,
    //     reasonForVisit: user.reasonForVisit,
    //   });
    // });
    users.forEach((user) => {
      worksheet.addRow(user);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

    await workbook.xlsx.write(res);

    res.end();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = exportExcel;
