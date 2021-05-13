//Hoisting
//FUNCTIONS AND VAR DECLARATION (VAR,LET AND CONST), BUT LET AND CONST DO NOT GET AUTO-INITIALIZED WHEN HOIST, BUT THEY HOIST
//JavaScript only hoists declarations, not initializations. 

//Examples:

console.log(num);
var num;
//undefined


console.log(num);
var num;
num = 5;
console.log(num);
//undefined
//5


console.log(a);
a = 7;
//ReferenceError: num is not defined
//That happened because JS hoist declaration, not initializations


b = 3;
let b;
// ReferenceError: Cannot access 'b' before initialization


console.log(c);
let c = "c";
// ReferenceError: c is not defined


d = 1; // initialization.
const d;
//SyntaxError: Missing initializer in const declaration



a = 'Hello'; // Initialize a
b = 'World'; // Initialize b

console.log(a + " " + b); // 'Hello World'
//There's no hoisting, but since initialization also causes declaration (var declaration) if not already declared, variables are available.

//A proof that let and const variables do hoist:
var devName = "Gonzalo";
{
  console.log(devName);
  let devName = "Sebastian"
}
//If the scoped devName wouldn't be hoisted the console.log(devName) should output "Gonzalo", but instead of that throws a ReferenceError: Cannot access 'devName' before initialization, that's how we know that let const hoist.

//Function hoisting
foo();
function foo() {
  console.log("I'm a function");  
}
//I'm a function


//But if we use a function expression instead of a function declaration:
foo1();
const foo1 = function foo() {
   console.log("I'm a function");  
}
//We'll get the next error:
//ReferenceError: Cannot access 'foo1' before initialization

