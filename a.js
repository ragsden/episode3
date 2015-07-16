var express = require('express')
  , app = express(),
bodyParser = require('body-parser');
var url = require('url');
app.use(bodyParser.json());
app.post('/', function(request, response){
    console.log(request.body);      // your JSON
    //frame(request, response);
    response.sendStatus(200);    // echo the result back
});

app.get('/', function(request, response){
  console.log(request.body);      // your JSON
  frame(request, response);
  response.send(request.body);    // echo the result back
});

app.listen(5000);

frame = function (req, res)
{
  var url_parts = url.parse(req.url, true);


  res.write("<body><H1>This is the home page with two frames</H1>");
  if(url_parts.query.testtxt){
    res.write(url_parts.query.testtxt);
  }
  res.write("<form>");
  res.write("<input type='text' name='testtxt' id='testtxt'/> <input type='submit' name='submit' />");
  res.write("</form>");
  res.write("</body></html>");
  res.end();

}

framepost = function (req, res)
{
  var ret = "<body><H1>This is the home page with two frames</H1>";
  if(req.body){
    ret += req.body;
  }
  ret += "<form>";
  ret += "<input type='text' name='testtxt' id='testtxt'/> <input type='submit' name='submit' />";
  ret += "</form>";
  ret += "</body></html>";
  res.send(ret);
  //res.end();

}