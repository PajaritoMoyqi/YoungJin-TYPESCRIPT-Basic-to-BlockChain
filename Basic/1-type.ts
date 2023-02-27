// variable

let tyFirstName: string;
let tyAge: number;
let tyAddress; // type any...

const tyMyAge = 20; // 이미 type은 number로 유추가 됨
const tyYourAge: number = 20; // 이런 중복은 피해야 함

let tyStrangeName: "Juan"; // type Juan, value "Juan"

// function

function tyGetName(): string|null {
  return null;
} // 둘 중 하나 반환

function tyBadFn(): any {
  return;
} // 안 쓰는 게 낫지, 이럴 거면 왜 TypeScript 씀?

const tyLogger = () => {
  while(true) {
    console.log('server ongoing...');
  }
} // 화살표 함수는 never type을 반환. 절대로 실행이 종료되지 않거나 오류를 발생시키기 위해서 만든 함수임.

function tyLogError(errorMessage: string): void {
  console.log('error: ', errorMessage);
} // void type: 값을 return하지 않는 함수


// union

class TyFormControl {
  constructor(initialValue: object, validator: TyValidatorFn|null) {
    /* ... */
  }
}
type TyValidatorFn = (c: TyFormControl) => {[key: string]: any}|null;

// class, interface

class TyBlock {
  readonly tyNonce: number;
  readonly tyHash: string;

  constructor(
    readonly tyIndex: number,
    readonly tyPreviousHash: number,
    readonly tyTimestamp: number,
    readonly tyData: string
  ){
    const { nonce, hash } = this.mine();
    this.tyNonce = nonce;
    this.tyHash = hash;
  }

  mine() {
    return {
      nonce: 1,
      hash: ""
    }
  }
}

interface TyPerson {
  name: string;
  age: number;
}

// structural type system

class TyP1 {
  name: string;
}
class TyAnother1 {
  name: string;
}
const ano1: TyAnother1 = new TyP1(); // 동작한다!

class TyP2 {
  name: string;
  age: number;
}
class TyAnother2 {
  name: string;
}
const ano2: TyAnother2 = new TyP2(); // 동작한다!

class TyP3 {
  name: string;
}
class TyAnother3 {
  name: string;
  age: number;
}
// 아래 주석은 오류!
// const ano3: TyAnother3 = new TyP3();

// union advanced

interface TyRectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface TyCircle {
  kind: "circle";
  radius: number;
}

type TyShape = TyRectangle | TyCircle;

function tyArea(shape: TyShape): number{
  switch(shape.kind) {
    case "rectangle": return shape.height*shape.width;
    case "circle": return Math.PI*shape.radius**2;
  }
}

const tyMyRectangle: TyRectangle = {
  kind: "rectangle",
  width: 10,
  height: 10
}
console.log(`My area is ${tyArea(tyMyRectangle)}`);

// any, unknown

type TyDog = {
  name: string;
}

let TyDog1: any;
TyDog1 = JSON.parse('{"naem": "Craeg"}'); // typo
console.log(TyDog1.name); // undefined

let TyDog2: unknown;
TyDog2 = JSON.parse('{"naem": "Svechuline"}'); // typo
// 아래 코드에서는 compile 오류 발생
// console.log(dog2.name);

// type guard

interface TyExampleA {
  a: number
};
interface TyExampleB {
  b: number
};

function exampleFn(x: TyExampleA|TyExampleB) {
  if("a" in x){
    return x.a;
  }
  return x.b;
} // "in" type guard

type TyCat = {
  discriminator: 'cat';
  age: number;
}
const isCat = (object: any): object is TyCat => !!object && object.discriminator === 'cat';