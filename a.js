var express = require('express')
  , app = express(),
  bodyParser = require('body-parser');
var util = require('util');
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', function(request, response){
  console.log(request.body);      // your JSON
  console.log(request.url);
  console.log(util.inspect(request.headers, {depth:100}));
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Thank you for writing review");    // echo the result back
  response.end();
});

app.get('/', function(request, response){
  console.log(request.body);      // your JSON
  console.log(request.url);
  response.sendStatus(200);
});

app.listen(5000);

