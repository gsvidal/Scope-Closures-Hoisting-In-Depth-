//Hoisting
//PRIMARILY FUNCTIONS AND VAR DECLARATION, BUT LET AND CONST DO NOT GET INITIALIZED (dont have default value) WHEN HOIST, BUT THEY HOIST (auto-register at the top of the scope)
//Only hoisted variables declared using var get its default initialization ( undefined ), let and const are uninitialized.
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

// If we forget the declaration (and only initialize the value) the variable isn't hoisted
console.log(a); //ReferenceError: a is not defined 
a = 7;
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

//TDZ: Temporal Dead Zone 
// The TDZ is the time window where a variable exists but is still uninitialized
// A var also has technically has a TDZ, but it’s zero in length and thus unobservable to our programs! Only let and const have an observable TDZ.

//MDN, Hoisting, https://developer.mozilla.org/en-US/docs/Glossary/Hoisting