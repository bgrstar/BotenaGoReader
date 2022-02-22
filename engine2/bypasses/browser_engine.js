const X = require('../x'),
    Browser = require('jsdom');
module.exports = function(proxy, uagent, callback) {
    var cookie = false;
    const browser = (new JSDOM(``, { 
	pretendToBeVisual: false,
	proxy: 'http://' + proxy,
	strictSSL: true,
	userAgent: uagent
	})).window;
	
	window.requestAnimationFrame(timestamp => {
  console.log(timestamp > 0);
});
	
    browser.maxDuration = 400e3;
    browser.maxWait = 380e3;
    browser.proxy = 'http://' + proxy;
    browser.userAgent = uagent;
    browser.visit(X._.address, () => {
        browser.wait(370e3, () => {
            if (browser.cookies.length > 0) {
                browser.cookies.forEach(acookie => {
                    if (!cookie) {
                        cookie = acookie.key + '=' + acookie.value;
                    } else {
                        cookie += ('; ' + acookie.key + '=' + acookie.value);
                    }
                });
                console.log(cookie);
                callback(cookie);
            } else {
                callback(false);
            }
            browser.deleteCookies();
            browser.cookies = undefined;
            delete browser.cookies;
            browser.window.close();
            browser.destroy();
            browser = undefined;
            delete browser;
            return false;
        });
    });
}