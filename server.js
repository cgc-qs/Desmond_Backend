const express = require("express");
const cors = require("cors");
const alert = require("./alert");


const app = express();

var corsOptions = {
  origin:'*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Scanner application." });
});


// const interval = setInterval(() => {
//   alert.alertProcess();
// }, 1000);

alert.sendEmail("paulchoe31@gmail.com");

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
