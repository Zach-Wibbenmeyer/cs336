/***************************************
*** Zach Wibbenmeyer                 ***
*** CS336                            ***
*** Keith Vanderlinden               ***
*** Lab02                            ***
*** September 14, 2016               ***
****************************************/

/* Person() - creates a person object prototype
 * @param: name, age, birthdate
 */
function Person(name, birthDate) {
    this.name = name;
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
function Student(name, birthDate, major) {
    this.name = name;
    this.birthDate = birthDate;
    this.major = major;
    this.greeting = "I'm a student!";
}

// Student inherits from Person
Student.prototype = Object.create(Person.prototype);


/****************************MAIN CODE ******************************************************/

// create two Person object prototype instances
var zachWibbenmeyer = new Person("Zach Wibbenmeyer", "1994/07/11");
var calebPostma = new Person("Caleb Postma", "1994/12/12");


//add Caleb as a friend
zachWibbenmeyer.addFriend(calebPostma);

// calculate Zach's age
console.log(zachWibbenmeyer.getAge(zachWibbenmeyer.birthDate));

// calculate Caleb's age
console.log(calebPostma.getAge(calebPostma.birthDate));

// print a greeting
zachWibbenmeyer.printGreeting();

// Change Caleb's name
calebPostma.changeName("M8");
console.log(calebPostma.name);

// print Zach's name
console.log(zachWibbenmeyer.name);

// create variables to store ages
var ageOfZach = zachWibbenmeyer.getAge(zachWibbenmeyer.birthDate);
var ageOfCaleb = calebPostma.getAge(calebPostma.birthDate);

// Compare the age between Zach and Caleb
if (ageOfZach > ageOfCaleb) {
    console.log("Zach is older than Caleb");
} else {
    console.log("Caleb is older than Zach");
}


// create two student object prototypes
var grantStubelt = new Student("Grant Stubelt", "1994/02/22", "Film");
var josiahStucki = new Student("Josiah Stucki", "1994/08/16", "Kineseology");
var jahnDavis = new Student("Jahn Davis", "1995/03/15", "Computer Science");

// print Jahn's subject
console.log(jahnDavis.major);

// print a greeting
grantStubelt.printGreeting();

// create variables to store ages
var ageOfGrant = grantStubelt.getAge(grantStubelt.birthDate);
var ageOfJahn = jahnDavis.getAge(jahnDavis.birthDate);

// compare ages between Grant and Jahn
if (ageOfGrant > ageOfJahn) {
    console.log("Grant is older than Jahn");
} else {
    console.log("Jahn is older than Grant");
}

if (jahnDavis.major == "Computer Science") {
    console.log("Awesome!");
} else {
    console.log("Aww....");
}


// Change Jahn's name
jahnDavis.changeName("Dahn Javis");
console.log(jahnDavis.name);

// See if Grant is an instance of student
console.log(grantStubelt instanceof Student);

// See is Zach is an instance of Person
console.log(zachWibbenmeyer instanceof Person);

// See if Zach is an instance of Student
console.log(zachWibbenmeyer instanceof Student);
