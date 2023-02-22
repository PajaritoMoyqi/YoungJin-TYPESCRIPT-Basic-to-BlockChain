class HWDog {
  name: string;
  sayHello(): string {
    return "Wow Baw";  
  };
}
class HWFish {
  name: string;
  dive(howDeep: number): string {
    return `Pooooww, for ${howDeep} minutes`;
  };
}
type HWPet = HWDog | HWFish;


function talkToHWPet(pet: HWPet): string {
  if(pet instanceof HWDog) return pet.sayHello();
  else if(pet instanceof HWFish) return "Fish can't talk!";
  else "You don't want to compile?"
}


const myHWDog = new HWDog();
const myHWFish = new HWFish();
talkToHWPet(myHWDog);
talkToHWPet(myHWFish);
// talkToHWPet("hello");