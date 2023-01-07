var pdf = require("pdf-creator-node");
var fs = require("fs");

var html = fs.readFileSync("file.html", "utf8");


var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
};
var users = [
    {
      name: "Shyam",
      age: "26",
    },
    {
      name: "Navjot",
      age: "26",
    },
    {
      name: "Vitthal",
      age: "26",
    },
  ];
var document = {
    html: html,
    data: {
      users: users,
      theme: "fin mémoire"
    },
    path: "./output.pdf",
    type: "",
  };

  pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });