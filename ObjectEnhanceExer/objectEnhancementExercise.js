//SAME KEYS AND VALUES
//ES5
function createInstructor(firstName, lastName){
  return {
    firstName: firstName,
    lastName: lastName
  }
}

//ES2015 Version
function createInstructor(firstName, lastName){
  return {
    firstName,
    lastName
  }
}


//COMPUTED PROPERTY NAMES
//ES5
var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!"

//ES2015 Version
let favoriteNumber = 42;
const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
}


//OBJECT METHODS
//ES5
var instructor = {
  firstName: "Colt",
  sayHi: function(){
    return "Hi!";
  },
  sayBye: function(){
    return this.firstName + " says bye!";
  }
}

//ES2015 Version
let instructor= {
  firstName: "Colt",
  sayHi(){
    return this.firstName + "says bye!";
  }
}


//createAnimal function
//ES5
const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
d.bark()  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
s.bleet() //"BAAAAaaaa"

//ES2015
const d = createAnimal("dog", "bark", "Woooof!")
d.bark()  //"Woooof!"
const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
s.bleet() //"BAAAAaaaa"

function createAnimal(species, verb, noise) {
  return { 
    species, [verb]() {return noise;}
  }
}

