/***************************************
Zach Wibbenmeyer
CS336
Keith Vanderlinden
Lab02
****************************************/

/* Person() - creates a person object prototype
 * @param: name, age, birthdate
 */
function Person(name, age, birthDate) {
    this.name = name;
    this.age = age;
    this.birthDate = birthDate;
    this.friends = [];
    this.greeting = "I'm a person!";
}

/* changeName() - changes the name of a person
 * @param: newName
 * @return: the new name of the person
 */
Person.prototype.changeName = function(newName) {
    this.name = newName;
}

/* printGreeting() - outputs a simple greeting */
Person.prototype.printGreeting = function() {
    console.log(this.greeting);
}

/* addFriend() - adds a new friend to the list object of friends
 * @param: newFriend
 */
Person.prototype.addFriend = function(newFriend) {
    this.friends.push(newFriend);
}

//Taken from the class website link
Person.prototype.getAge = function(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/* Student() - creates a student object prototype
 * @param: subject
 */
function Student(name, age, birthDate, subject) {
    this.name = name;
    this.age = age;
    this.birthDate = birthDate;
    this.subject = subject;
    this.greeting = "I'm a student!";
}

// Student inherits from Person
Student.prototype = Object.create(Person.prototype);


/****************************MAIN CODE ******************************************************/

// create two Person object prototype instances
var zachWibbenmeyer = new Person("Zach Wibbenmeyer", 22, "July 11, 1994");
var calebPostma = new Person("Caleb Postma", 21, "December 12, 1994");


//add Caleb as a friend
zachWibbenmeyer.addFriend(calebPostma);

// calculate Zach's age
console.log(zachWibbenmeyer.getAge("1994/07/11"));

// print a greeting
zachWibbenmeyer.printGreeting();

// Change Caleb's name
calebPostma.changeName("M8");
console.log(calebPostma.name);

// print Zach's name
console.log(zachWibbenmeyer.name);


// Compare the age between Zach and Caleb
if (zachWibbenmeyer.age > calebPostma.age) {

    console.log("Zach is older than Caleb");

} else {

    console.log("Caleb is older than Zach");

}


// create two student object prototypes
var grantStubelt = new Student("Grant Stubelt", 22, "February 22, 1994", "Film");
var josiahStucki = new Student("Josiah Stucki", 22, "August 16, 1994", "Kineseology");
var jahnDavis = new Student("Jahn Davis", 21, "March 15, 1995", "Computer Science");

// print Jahn's subject
console.log(jahnDavis.subject);

// print a greeting
grantStubelt.printGreeting();

// compare ages between Grant and Jahn
if (grantStubelt.age > jahnDavis.age) {
	console.log("Grant is older than Jahn");
} else {
	console.log("Jahn is older than Grant");
}

// See if Grant is an instance of student
console.log(grantStubelt instanceof Student);
