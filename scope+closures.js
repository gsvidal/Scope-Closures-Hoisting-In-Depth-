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


//Next we have some exercises to really and deeply understand closures:

//Exercise 1
let a = 3;
function addTwo(x) {
  //var x = 3;
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
let val1 = 2;
function multiplyThis(n) {
  let ret = n * val1;
  return ret;
}
let multiplied = multiplyThis(6);
console.log('example of scope:', multiplied);
//12



//Exercise 3
//A function that returns a function example is essential to understand closures
1: let val = 7;
2: function createAdder() {
3:   function addNumbers(a, b) {
4:     let ret = a + b;
5:     return ret;
6:   }
7:   return addNumbers;
8: }
9: let adder = createAdder();
10: let sum = adder(val, 8);
11: console.log('example of function returning a function: ', sum);
//15


// But how does the JS engine really work?

// Line 1: We declare a variable val in the global execution context and assign the value 7 to that variable

// Line 2: We declare a variable named createAdder and we assign a function definition to it (we put "function" before createAdder) all this happens int the global exection context, we have to remember that whatever is between the curly brackets {} is not executed, not even evalated, just stored the function definition into a variable for future use

// Line 9: we declare a new variable, named adder in the global execution context, temporarily, undefined is assigned to adder. , we see round brackets() so we need to execute or call the function. let's query the gec's memory and look for a variable named createrAdder, it was created  before so let's call it.

// Line 2: a new local execution context is created.the engine adds the new context to the call MediaStreamTrack, the function has no arguments, so let's jump right into the body of it.

// Line 3- 6, we have a new function declaration, we create the variable addNumbers in the local execution context( addNumbers just exists in this lec) and assign a function definition to it (function addNumber) , we store the function definition in the local variable named addNumber.

//Line 7: We return the content of the variable addNumbers. The engine looks for a variable named addNumbers and finds it. It's a function definition, it's ok because this function(addNumbers) can return anything, including another function definition, so it return addNumbers definition- anything between the brackets on lines 4 and 5 makes up the function definition, we also remove the local execution context from the call stack.

// After return, the lec is destroyed , the addNumbers variable doesn't exist anymore. the function definition still exists though, it was returned from the createAdder function and assigned to the variable adder, which was previously created.

// Now in line 10, we define a new sum variable in the gec/global scope, we assign undefined to it.
// Then we need to execute a function, the function named adder, we look it up in the global scope/gec and we find it, this function takes two parameters 

// Let's retrieve these parameteres, so we can call the function (with the correct arguments) and pass it, remember that the addNumbers function definition was assigned to adder because of that we call adder(2 parameters), in this case val was defined before and the second parameter is 8

// Now we have to execute that function (adder), a new local execution context (local scope) is created. Within the lec two new variables are created: a and b. they were assigned the values 7 and 8, as the arguments we passed before

//A new variable is declared, name ret, it's declared in the lec, its value is set to undefined. Then an adition is performed, where we add the content of variable a and b, the result (15) is assigned to the ret variable

//After that ret is returned, the lec is destroyed , it is removed from the call stack, the variables a, b and ret no longer exist.

//The returned value is assigned to the variable named sum

//We print out the value of sum to the console.


//Finally a closure:
