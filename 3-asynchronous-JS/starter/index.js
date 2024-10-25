const fs = require('fs');   

const superagent = require('superagent');

const readFilePro=file => new Promise((resolve,reject)=>{   

    fs.readFile(file,'utf8',(err,data)=>{  
        if(err){   console.log('Error reading file'); }   
        resolve(data);   
    });
});


readFilePro(`${__dirname}/a.txt`).then(data=>{
        console.log(`Breed: ${data}`);   
    
      return  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)})
        .then(res=>{  
            console.log(`Random Dog Image: ${res.body.message}`);
    
          return writeFilePro('dog-image.txt',res.body.message);
        }).then(()=>{
            console.log('Dog Image saved successfully');
        }).catch(err=>{
            console.log(err);
        });
    
    




const writeFilePro=file => data => new Promise((resolve,reject)=>{   

    fs.writeFile(file,data,err=>{    
        if(err){   console.log('Error writing file'); }     
        resolve("success");   
           }    );
});


