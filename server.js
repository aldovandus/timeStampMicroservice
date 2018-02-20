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
    var date = new Date(data);
    var monthName = date.toLocaleString("en-us", { month: "long" });
    timeStamp = Math.floor(date / 1000);
    if(!isNaN(timeStamp))
      natural = monthName + " " + date.getDate() +  ", " + date.getFullYear();
    else
      natural = null;
  }
  else{
      var date = new Date(data * 1000);
      var monthName = date.toLocaleString("en-us", { month: "long" });
      timeStamp = parseInt(data);
      natural = monthName + " " + date.getDate() +  ", " + date.getFullYear();
  }
  
  response.json({"unix":timeStamp,"natural": natural});
  
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
