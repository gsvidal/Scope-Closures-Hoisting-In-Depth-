//Scopes
//Scopes are the context in which values and expressions are visible or can be referenced, scopes can be layered in a hierarchy, so the child or inner scopes have access to parent or outer scopes, but not viceversa. Also scopes are defined at parsing time.

//A classic scope-closure exercise is something like this:
const buildCount = (i) => {
  let count = i;
  const displayCount = () => {
    console.log(count++);
  };
  return displayCount;
};

const myCount = buildCount(1);
myCount(); //1
myCount(); //2
myCount(); //3

//But for someone new at javascript this is something big to assimilate, so let's break this up a little bit in a series of exercises deeply explained:

// How does the JS engine really work?

//Exercise 1
let a = 3;
function addTwo(x) {
  let ret = x + 2;
  return ret;
}
let b = addTwo(a);
console.log(b);
//5

//The compiler asks the global scope manager(gsm) if already exists a variable named "a", the gsm doesn't find it, so it creates it. then assigns to it the aritmethic expression, a literal value of 3, after that the gsm has a new request for creating a variable named addTwo, as it doesn't exists yet, it's created and is assigned to it a function definition. Still in the global scope a b variable is also created and assign for now an undefined, in that line, occurs a call expression addTwo() the gsm check if it exits in that scope and there it is, so executes it sending an a argument, so a is also checked and its value is 3 in the global scope, so the addTwo function have a parameter x, so it's created in the local execution context, and it's assigned the value of 3, so x = 3; then a ret variable is created in the function execution context and it's assign to it a binary expression (x + 2), the x = 3 and 2; 5 is assigned to ret, the next line is a return statement and finish the function, the 5 is returned when it's called and immediately the function instance as well as its local execution context and its variables (x, ret) are destroyed by the garbage colector.
// Then again in the global scope the b variable is assigned with the 5 returned. and finally it's put to the console the value of b (5).



//Exercise 2
//Here we can see the lexical scope definition in practice: 
// Lexical scope is when a function can access a variable declared in its outer scope(next outer scope and so on)
//Or when a variable defined outside a function can be accessible inside that function

//Lexical scope / Ambito Léxico / Scope Chain
let val1 = 2;
function multiplyThis(n) {
  let ret = n * val1;
  return ret;
}
let multiplied = multiplyThis(6);
console.log('example of scope:', multiplied);
//example of scope: 12


//Exercise 3
//A function that returns a function example is essential to understand closures
let val = 7;
function createAdder() {
  function addNumbers(a, b) {
    let ret = a + b;
    return ret;
  }
  return addNumbers;
}
let adder = createAdder();
let sum = adder(val, 8);
console.log('example of function returning a function:', sum);
//example of function returning a function: 15


// Line 55: We declare a variable val in the global execution context and assign the value 7 to that variable

// Line 56: We declare a variable named createAdder and we assign a function definition to it (we put "function" before createAdder) all this happens int the global exection context, we have to remember that whatever is between the curly brackets {} is not executed, not even evalated, just stored the function definition into a variable for future use

// Line 63: we declare a new variable, named adder in the global execution context, temporarily, undefined is assigned to adder. , we see round brackets() so we need to execute or call the function. let's query the gec's memory and look for a variable named createrAdder, it was created  before so let's call it.

// Line 56: a new local execution context is created.the engine adds the new context to the call MediaStreamTrack, the function has no arguments, so let's jump right into the body of it.

// Line 57-60, we have a new function declaration, we create the variable addNumbers in the local execution context( addNumbers just exists in this lec) and assign a function definition to it (function addNumber) , we store the function definition in the local variable named addNumber.

//Line 61: We return the content of the variable addNumbers. The engine looks for a variable named addNumbers and finds it. It's a function definition, it's ok because this function(addNumbers) can return anything, including another function definition, so it return addNumbers definition- anything between the brackets on lines 58 and 59 makes up the function definition, we also remove the local execution context from the call stack.

// After return, the lec is destroyed , the addNumbers variable doesn't exist anymore. the function definition still exists though, it was returned from the createAdder function and assigned to the variable adder, which was previously created.

// Now in line 64, we define a new sum variable in the gec/global scope, we assign undefined to it.
// Then we need to execute a function, the function named adder, we look it up in the global scope/gec and we find it, this function takes two parameters 

// Let's retrieve these parameteres, so we can call the function (with the correct arguments) and pass it, remember that the addNumbers function definition was assigned to adder because of that we call adder(2 parameters), in this case val was defined before and the second parameter is 8

// Now we have to execute that function (adder), a new local execution context (local scope) is created. Within the lec two new variables are created: a and b. they were assigned the values 7 and 8, as the arguments we passed before

//A new variable is declared, name ret, it's declared in the lec, its value is set to undefined. Then an adition is performed, where we add the content of variable a and b, the result (15) is assigned to the ret variable

//After that ret is returned, the lec is destroyed , it is removed from the call stack, the variables a, b and ret no longer exist.

//The returned value is assigned to the variable named sum

//We print out the value of sum to the console.



//Finally we'll see a closure:
function createCounter() {
  let counter = 0;
  const myFunction = function() {
    counter = counter + 1;
    return counter;
  }
  return myFunction;
}
const increment = createCounter();
 const c1 = increment();
 const c2 = increment();
 const c3 = increment();
 console.log('example increment:', c1, c2, c3);
 //example increment: 1 2 3


//Line 101: The compiler finds a formal variable declaration with a function definition attach to it, then asks the global scope manager if the creatCounter variable exists, but the gsm says doesn't find any, so the compiler produce code that at execution time ask to create a new variable called students in that scope bucket.

// Everything inside the createCounter function (beetween the curly brackets) it's not going to be processed yet (but it was already parsed- to make the AST). In modern web browser this is known as lazy compiling, it's going to be compiled when it's executed(called/invocked)

//Now we are going to shorten the explanation

//Line 109: An increment variable is going to be created in the global scope and then assigned a createCounter(), the "()" means that we call that function, so we find that variable declared and defined at line 101, a new local execturion context is created (a function scope).

//Line 102: a counter variable is created in the createCounter scope and we assign the 0 to it.

//Line 103: a MyFunction variable is declared and has a function definition assign to it, WE ALSO CREATE A CLOSURE AND INCLUDE IT AS PART OF THE FUNCTION DEFINITION. THE CLOSURE CAONTAINES THE VARIABLES THAT ARE IN SCOPE, IN THEIS CASE THE VARIABLE counter.

//Everything from line 104 to 105 is not proccesed yet.

//Line 107: we have a return statement , and the variable MyFunction is returned, the local scope manager is asked if the myFunction variable already exists, and the answer is yes, so because it has a function definition attached to it, it will return  the function definition (whatever is from line 104 to 105) and its closure. The garbage collector takes care of the local scopes and local variables created until now. 

//Next we assign line 104-105 to the increment variable; so now that function definition is not labeled myFunction anymore, now is called increment and has a function definition including its closure.

//Line 110: a c1 variable is created in the global scope and is assigned a callingExpression increment(), Now we are going to execute line 104-105, so it is created a increment local scope when a counter variables is checked, before looking in the local and global scope, let's check the CLOSURE, it contains the variable named counter, and after the expression in line 104, its value is set to 1, now the closure contains counter with its value 1.

//The counter value is returned (1) and it's assigned to c1

//Line 111: We repeat steps in line 133, c2 gets assigned 2

//Line 112: We repeat steps in line 133, c2 gets assigned 3.

//Line 113: The content of variables c1, c2 and c3 is logged in console.

//So now we understand how closures works, the key to remember is that when a function gets declared, it contains a function definition and a closure. The closure is a collection of all the variables in the function's scope.

// This works even in the global scope, yes it is created a closure as well but since these functions were created in the global scope, they have access to all the variables in the global scope, and the closure concept is not that relevant


//Another example with 2 functions returned (two closures), we'll see the same effect
let glob = "g";
function f1() {
    let loc = "l";
    glob = glob + loc;
    function f2() {
       let loc2 = "l2";
       function f3() {
          loc2 = loc2 + loc + glob;
          return loc2;
       }
       return f3;
    }
    return f2;
}
const g1 = f1(); 
const g2 = g1();
const c1 = g2(); 
const c2 = g2(); 
console.log(c1); //l2lgl
console.log(c2); //l2lgllgl



//Bibliography:

// Olivier De Meulder,"I never understood javascript closures.", Medium, https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8

//Simpson, Kyle. You Don't Know JS Yet: Scope & Closures

//MDN, Scope, https://developer.mozilla.org/en-US/docs/Glossary/Scope