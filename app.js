/**
 * Created by raghu on 3/1/14.
 */

/**
 * learning series name : nymyway
 * episode 2 : blockinge
 *
 * in addition to episode2, I'm creating frames to see the serialized page loads side by side.
 * Since I have to load a frame first, I will introduce the concept of routes.
 * For the root url I will send te HTML tags conataining the frames and every frame will requets a url
 * which will have "/sleep" in the path and the code will render the sleep html.
 *  Here the code loops for 6 seconds before responding. When you open two browsers and browse the app,
 * you will notice that the requests are serialized
 *
 * */
var http = require('http');
var url = require('url');
var util = require('util');

var reqcount = 0;
http.createServer(function (req, res) {

    var url_parts = url.parse(req.url, true);
    var pathname = url_parts.pathname;
    var host = (url_parts.host || '');
    console.log('dddd');
    console.log(util.inspect(req.body, {depth:100}));
    reqcount++;


    if(pathname == "/")
    {
        frame(req, res,host);
    }
    else
    {
        res.write("serving request " + reqcount + "\n");
        sleep(res);
    }

}).listen(Number(process.env.PORT || 5000));
console.log('Server running at http://127.0.0.1:5000/');

sleep = function (res)
{
    var mins = new Date().getMinutes();
    var secs = new Date().getSeconds();

    res.write( "Start time = " + mins + ":" + secs + "\n");

    while(true)
    {
        if(Math.abs((new Date().getSeconds() - secs)) > 6)
        break;
    }
    res.end("end time = " + new Date().getMinutes() + ":" + new Date().getSeconds()  + "\n")
}

frame = function (req, res, host)
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
