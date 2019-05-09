console.log(`

This script will try to run \`http-server\` node server from this location, and open \`/demos/\` url in your default browser.
You may do that manually using any other http server of your choice.

`);

const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

askQuestion("Continue Y/N\n").then(answer => {

    if (answer.toLowerCase() !== "y") {
        return;
    }
    console.log("");
    console.log("");
    
    const open = require('open');
    const exec = require('child_process').exec("http-server");
    let started = false;
    exec.stdout.on('data', data => {
        console.log(data);
        if (started) {
            return;
        }
        let i = data.indexOf("http://");
        if (i === -1) {
            return;
        }
        let url = data.substring(i, data.indexOf("\n", i)) + "/demos/";
        console.log();
        console.log("Opening ...", url);
        open(url);
        started = true;
    });
    exec.stderr.on('data', data => {
        console.log("\n");
        console.log("Error occurred while trying to start http server on /demos/\n");
        console.log("This might be because node http-sever is not installed on system, so you might want to run following command:\nnpm install http-server -g\n");
        console.log("Or, you can run manually another web server and point it to demo index file - /demos/index.html\n\n");
    
        console.log("Here is what we know about the error:\n");
        console.log(data);
    });
    exec.on('exit', data => console.log(data));
});
