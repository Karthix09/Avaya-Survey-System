var xlsx = require("xlsx");
var iconvlite = require('iconv-lite');

var workbook = xlsx.readFile("Customer-Satisfaction-Score-Card.xlsx");

var worksheet = workbook.Sheets["CSAT"];

var responseData = xlsx.utils.sheet_to_json(worksheet)

//Logout CSAT worksheet data (JSON format)
console.log(responseData);

var x = 45;

//Log out sheet names
// console.log(workbook.SheetNames);

//Log out worksheet data (Unformatted)
// console.log(worksheet);

//   output byte array
//   console.log (data) when reading successfully;
//   Converts the array to GBK Chinese
//   var str = iconv.decode (data, ' GBK ');
//   Console.log (str);}}

