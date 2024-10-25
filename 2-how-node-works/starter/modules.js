// console.log(arguments);
// console.log(require("module").wrapper);
const cal = require("./test-module1");
const calc1 = new cal() ;
console.log(calc1.add(2, 3));  

// const calc2 = require("./test-module2");
// console.log(calc2.subtract(5, 3)); 

const {add, subtract,multiply,divide} = require("./test-module2");  

// console.log(add(2, 3)); 
// console.log(subtract(5, 3)); 
// console.log(multiply(2, 3));    


//cashing the module    
require("./test-module3")();
require("./test-module3")();
require("./test-module3")();