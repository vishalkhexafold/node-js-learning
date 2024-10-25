 const fs  = require('fs'); 
 const server = require('http').createServer();
 server.on('request', (req, res) => {     
    // sol 1
    // fs.readFile('test-file.txt', (err, data) => {

    //     if(err) console.log(err);   
    //     res.end(data);      
    // });

  //  sol 2: Stream approach

//   const readable = fs.createReadStream('test-file.txt');
//   readable.on('data', (chunk) => {
//       res.write(chunk);

//    });


//    readable.on('end', () => {
//       res.end();            
//    });


//    readable.on('error', (err) => {
//         console.log(err);   
//         res.statusCode = 500;
//         res.end('Internal Server Error');   

//    });

    // solution 3: Using pipe method
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res); 
    //readableSource.pipe(writableDestination);

  //server ending 
});
   server.listen(8000, "127.0.0.1",() => {          
       console.log('Server is running on port 8000');           
       });
   