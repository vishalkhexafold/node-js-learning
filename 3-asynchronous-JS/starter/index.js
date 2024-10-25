const fs = require('fs');   
const { get } = require('http');

const superagent = require('superagent');

const readFilePro=file => new Promise((resolve,reject)=>{   

    fs.readFile(file,'utf8',(err,data)=>{  
        if(err){   console.log('Error reading file'); }   
        resolve(data);   
    });
});

const writeFilePro=file => data => new Promise((resolve,reject)=>{   

    fs.writeFile(file,data,err=>{    
        if(err){   console.log('Error writing file'); }     
        resolve("success");   
           }    );
});
const getDogPic = async()=>{    
try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);   
    const res1 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    
const all = await Promise.all([res1,res2,res3]);
const images = all.map(res=>res.body.message);
console.log(`Random Dog Images: ${images}`);

    await writeFilePro('dog-image.txt',images.join('\n'));
    console.log('Dog Image saved successfully');
} catch (error) {
 console.log(error);   
 throw error;
}
  
}

// Call the function
// getDogPic().then(()=>console.log('Done!'))  .catch(err=>console.log(err))   ;


(async()=>{
    try {
        console.log('Start');
        const data = await getDogPic();
        console.log(`completed}`);   
    } catch (error) {
        console.log("error");   
    }
})();
/*
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
    
    





    */
