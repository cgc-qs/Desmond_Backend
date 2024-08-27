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


Clinets=[
"info@bawoneo.de",
"info@elmers-sanitaer.de",
"info@bien-gmbh.de",
"mail@biering-bad.de",
"info@berg-shk.de",
"info@bohr-versorgungstechnik.de",
"mail@heizung-buddrus.de",
"info@sanitaer-heizung-burmeister.de",
"info@buschermoehle.de",
"info@ch-preuss.de",
"vertrieb@cet-technology.de",
"post@cuw-ht.de",
"info@christ-berlin.de",
"info@derguteschaefer.de",
"info@dau-flintbek.de",
"info@deibelgmbh.de",
"info@d-deimann.de",
"info@dittmer-scheessel.de",
"info@dmb-team.de",
"info@dressler-erdwaerme.de",
"info@dtm-shk.de",
"info@eddys-gt.de",
"info@ehlen-erdbohrungen.com",
"info@ehnle.de",
"info@eichholz-hc.com",
"richter.a@elektro-richter.de",
"info@elektro-schandelmeyer.de",
"info@energie-farm.com",
"info@baederschmidt.de",
"info@esr-bolender.de",
"info@evoles,de",
"info@fischer-energy.de",
"fisher@badundheizung.de",
"info@flerus.com",
"info@forum-wohnenergie.de",];

index=0;
const interval = setInterval(() => {
  if (index>=Clinets.length)
    return;
  alert.sendEmail(Clinets[index],index);
  index+=1;
}, 2*60*1000);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Clinet Count = > ${Clinets.length}.`);
});
