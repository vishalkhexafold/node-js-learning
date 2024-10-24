// Import the file system module for handling file operations
const fs = require("fs")
const crypto = require("crypto");
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 23;

// Schedule a function to run after the current event loop phase, printing a message after a timeout
setTimeout(()=>console.log("Timer 1 finished"),0);

// Schedule a function to run after the current event loop phase, printing a message for immediate execution
setImmediate(()=>console.log("Immediate 1 finished"))
// Asynchronously read a file and log a message once the I/O operation is complete
fs.readFile("test.file.txt",()=>{
    console.log("I/O finished");

    console.log("-------------------------------------------------------------------");   
    setTimeout(()=>console.log("Timer 2 finished"),0);
    setTimeout(()=>console.log("Timer 3 finished"),300);
    setImmediate(()=>console.log("Immediate 2 finished"),0);
    process.nextTick(()=>console.log("Process.nextTick "));

    crypto.pbkdf2Sync("password","salt",100000,1024,"sha512",()=>{
        console.log(Date.now()-start, "Password one encrypted");

});
crypto.pbkdf2Sync("password","salt",100000,1024,"sha512",()=>{
    console.log(Date.now()-start, "Password encrypted");

});  crypto.pbkdf2Sync("password","salt",100000,1024,"sha512",()=>{
    console.log(Date.now()-start, "Password encrypted");

});  crypto.pbkdf2Sync("password","salt",100000,1024,"sha512",()=>{
    console.log(Date.now()-start, "Password encrypted");

});

// Log a message to the console from the top-level of the script
// console.log("Hello from the top-level code");
});