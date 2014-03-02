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
var reqcount = 0;
http.createServer(function (req, res) {

    var url_parts = url.parse(req.url, true);
    var pathname = url_parts.pathname;
    var host = (url_parts.host || '');

    reqcount++;


    if(pathname == "/")
    {
        frame(res,host);
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

frame = function (res, host)
{
    res.write("<body><H1>This is the home page with two frames</H1>" +
        "<iframe src='" + host + "/sleep'></iframe>" +
        "<iframe src='" + host + "/sleep'></iframe>" +
        "</body></html>");
    res.end();

}
