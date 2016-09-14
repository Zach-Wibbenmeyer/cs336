
function Person(name, age, birthDate) {
    this.name = name;
    this.age = age;
    this.birthDate = birthDate;
    this.friends = [];
    this.greeting = "I'm a person!";
}

Person.prototype.changeName = function(newName) {
    this.name = newName;
}

Person.prototype.printGreeting = function() {
    console.log(this.greeting);
}

Person.prototype.addFriend = function(friend) {
    this.friends.push(friend);
}

var zachWibbenmeyer = new Person("Zach Wibbenmeyer", 22, "July 11, 1994");
var calebPostma = new Person("Caleb Postma", 21, "December 12, 1994");

zachWibbenmeyer.addFriend(calebPostma);

if (zachWibbenmeyer.age > calebPostma.age) {
    console.log("Zach is older than Caleb!");
} else {
    console.log("Caleb is older than Zach");
}

function Student(subject) {
    this.subject = subject;
    this.greeting = "I'm a student!";
}

Student.prototype.outputGreeting = function () {
    console.log(this.greeting);
}

Student.prototype = Object.create(Person.prototype);

var grantStubelt = new Student("Grant Stubelt", 22, "February 22, 1994", "Film");
var josiahStucki = new Student("Josiah Stucki", 22, "August 16, 1994", "Kineseology");