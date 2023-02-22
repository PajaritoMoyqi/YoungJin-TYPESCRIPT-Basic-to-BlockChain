// variable

let firstName: string;
let age: number;
let address; // type any...

const myAge = 20; // 이미 type은 number로 유추가 됨
const yourAge: number = 20; // 이런 중복은 피해야 함

let strangeName: "Juan"; // type Juan, value "Juan"

// function

function getName(): string|null {
  return null;
} // 둘 중 하나 반환

function badFn(): any {
  return;
} // 안 쓰는 게 낫지, 이럴 거면 왜 TypeScript 씀?

const logger = () => {
  while(true) {
    console.log('server ongoing...');
  }
} // 화살표 함수는 never type을 반환. 절대로 실행이 종료되지 않거나 오류를 발생시키기 위해서 만든 함수임.

function logError(errorMessage: string): void {
  console.log('error: ', errorMessage);
} // void type: 값을 return하지 않는 함수


// union

class FormControl {
  constructor(initialValue: object, validator: ValidatorFn|null) {
    /* ... */
  }
}
type ValidatorFn = (c: FormControl) => {[key: string]: any}|null;

// class, interface

class Block {
  readonly nonce: number;
  readonly hash: string;

  constructor(
    readonly index: number,
    readonly previousHash: number,
    readonly timestamp: number,
    readonly data: string
  ){
    const { nonce, hash } = this.mine();
    this.nonce = nonce;
    this.hash = hash;
  }

  mine() {
    return {
      nonce: 1,
      hash: ""
    }
  }
}

interface Person {
  name: string;
  age: number;
}

// structural type system

class P1 {
  name: string;
}
class Another1 {
  name: string;
}
const ano1: Another1 = new P1(); // 동작한다!

class P2 {
  name: string;
  age: number;
}
class Another2 {
  name: string;
}
const ano2: Another2 = new P2(); // 동작한다!

class P3 {
  name: string;
}
class Another3 {
  name: string;
  age: number;
}
// 아래 주석은 오류!
// const ano3: Another3 = new P3();

// union advanced

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Rectangle | Circle;

function area(shape: Shape): number{
  switch(shape.kind) {
    case "rectangle": return shape.height*shape.width;
    case "circle": return Math.PI*shape.radius**2;
  }
}

const myRectangle: Rectangle = {
  kind: "rectangle",
  width: 10,
  height: 10
}
console.log(`My area is ${area(myRectangle)}`);

// any, unknown

type Dog = {
  name: string;
}

let dog1: any;
dog1 = JSON.parse('{"naem": "Craeg"}'); // typo
console.log(dog1.name); // undefined

let dog2: unknown;
dog2 = JSON.parse('{"naem": "Svechuline"}'); // typo
// 아래 코드에서는 compile 오류 발생
// console.log(dog2.name);

// type guard

interface exampleA {
  a: number
};
interface exampleB {
  b: number
};

function exampleFn(x: exampleA|exampleB) {
  if("a" in x){
    return x.a;
  }
  return x.b;
} // "in" type guard

type Cat = {
  discriminator: 'cat';
  age: number;
}
const isCat = (object: any): object is Cat => !!object && object.discriminator === 'cat';