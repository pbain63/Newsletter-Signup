//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
  console.log(res.statusCode); // 200
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;

  const lastName = req.body.lName;

  const email = req.body.email; ///

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/718ea68962";
  const options = {
    method: "POST",
    auth: "prodip1:00fb1d291898b26426338ff4b44d888a-us21",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      //res.send("OK!");
      res.sendFile(__dirname + "/success.html");
    } else {
      //res.send("SOmething ie wrong!");
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      ///
      console.log(JSON.parse(data));
    });
  });
  //request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(proces.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});


