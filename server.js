// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:data", function (request, response) {
    var data = request.params.data;
  
  var natural;
  var timeStamp;
  
  if(isNaN(data)){
    natural = new Date(data);
    var monthName = natural.toLocaleString("en-us", { month: "long" });
    timeStamp = Math.floor(natural / 1000);
  }
  else{
      natural = new Date(data*1000);
      var monthName = natural.toLocaleString("en-us", { month: "long" });
      timeStamp = parseInt(data);
  }
  
  response.json({"unix":timeStamp,"natural": monthName + " " + natural.getDate() +  ", " + natural.getFullYear()});
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
