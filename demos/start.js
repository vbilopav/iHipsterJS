console.log("\n");
console.log(" *** To start browsing demos, navigate to /demos/ ***");
console.log("\n");

const exec = require('child_process').exec("http-server ../ -o");
exec.stdout.on('data', data => console.log(data));
exec.stderr.on('data', data => {
    console.log("\n");
    console.log("Error occurd while trying to start http server on /demos/index.html\n");
    console.log("This might be because node http-sever is not installed on system, so you might want to run following command:\nnpm install http-server -g\n");
    console.log("Or, you can run manually another web server and point it to demo index file - /demos/index.html\n\n");

    console.log("Here is what we know about the error:\n");
    console.log(data);
});
exec.on('exit', data => console.log(data));
