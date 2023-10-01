const Stack = require("./stack");
const Queue = require("./queue");


class Browser_b_f {
    constructor(){
        this.stack1 = new Stack();
        this.stack2 = new Stack();
    }

    add(url){
        this.stack1.push(url)
        this.stack2 = new Stack();
    }

    back(){
        this.stack2.push(this.stack1.peek());
        return this.stack1.pop();
    }

    forward(){
        this.stack1.push(this.stack2.peek());
        return this.stack2.pop();
    }
}

function reverseString(string){
    let stack = new Stack();
    for (let i = 0; i < string.length; i++){
        stack.push(string[i]);
    }
    let output = "";
    for (let i = 0; i < string.length; i++){
        output += stack.pop();
    }
    return output;
}

function balancedBrackets(string){
    let stack = new Stack();
    for (let i = 0; i < string.length; i++){
        if (string[i] === "(" || string[i] === "[" || string[i] === "{"){
            stack.push(string[i]);
        }
        if (string[i] === "(" || string[i] === "[" || string[i] === "{"){
            if (stack.isEmpty()){
                return false;
            }
            switch(string[i]) {
                case ")":
                    if (stack.pop() !== "("){
                        return false;
                    }
                case "]":
                    if (stack.pop() !== "["){
                        return false;
                    }
                case "}":
                    if (stack.pop() !== "{"){
                        return false;
                    }
                default:
                    break;
            }
        }
    }
    return true;
}

function find_survivor(count, skip){
    let queue1 = new Queue();
    let queue2 = new Queue();
    let c = 0;
    for (let i = 0; i < count; i++){
        queue1.enqueue(i);
    }
    while (queue1.size + queue2.size > 1){
        c++;
        if (c === skip){
            queue1.dequeue();
            c = 0;
        }
        else {
            queue2.enqueue(queue1.dequeue());
        }
        if (queue1.isEmpty()){
            queue1 = queue2;
            queue2 = new Queue();
        }
    }
    return queue1.dequeue();
}

function calculator(expr){
    let arr = expr.split(" ");
    arr = arr.filter((val) => val !== "");
    let stack = new Stack();
    let val1;
    let val2;
    for (let val of arr){
        stack.push(val);
    }
    while (stack.size > 1){
        val1 = parseInt(stack.pop());
        val2 = parseInt(stack.pop());
        if (val1 === NaN || val2 === NaN){
            return NaN;
        }
        switch(stack.pop()) {
            case "+":
                val2 += val1;
            case "-":
                val2 -= val1;
            case "*":
                val2 *= val1;
            case "/":
                val2 /= val1;
        }
        stack.push(val2);
    }
    return stack.pop();
}

