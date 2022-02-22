process.on('uncaughtException', function(err) {
  console.log(err)
});
process.on('unhandledRejection', function() {});
var fs = require("fs");
var url = require('url');
var WebSocket = require('ws');
var HttpsProxyAgent = require('https-proxy-agent');
var proxies = fs.readFileSync('Checked.txt', 'utf-8').replace(/\r/g, '').split('\n');

setInterval(() => {
var proxy = process.env.http_proxy || 'http://' + proxies[Math.floor(Math.random() * proxies.length)];
var endpoint = process.argv[2] || 'ws://demos.kaazing.com/echo';
var parsed = url.parse(endpoint);
var options = url.parse(proxy);
 
var agent = new HttpsProxyAgent(options);
var socket = new WebSocket(endpoint, "http",{ agent: agent });
 
socket.on('open', function () {
  console.log('"open" event!');
  socket.send('');
});  
});