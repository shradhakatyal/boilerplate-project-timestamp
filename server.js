// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  // Checking if the date is valid
  let dateString = req.params.date_string;
  let date;
  console.log(dateString);
  if(!dateString) {
    date = new Date();
    let responseObj = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
    }
    res.send(responseObj);
  } else if(dateString.indexOf("-") == -1) {
    dateString = Number(dateString);
    date = new Date(dateString);
    let responseObj = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
    }
    res.send(responseObj);
  }else if (isNaN(Date.parse(dateString)) == false) {
    date = new Date(dateString);
    let responseObj = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
    }
    res.send(responseObj);
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }

});
app.get("*", function(req, res) {
  res.send("Page not found");
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});