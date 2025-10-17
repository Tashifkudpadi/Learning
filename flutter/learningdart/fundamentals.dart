import 'package:flutter/material.dart';

// <!----------------- command to create flutter project --------------->

// flutter create <project_name>

// <!----------------- command to run flutter project --------------->

// flutter run or run>run without debugging

// <!-- keywords -->

// there are few keywords in flutter that are used to build the application.

// <!----------------- keywords --------------->

// 1. main
// 2. StatelessWidget
// 3. StatefulWidget
// 4. runApp
// 5. StatelessWidget
// 6. StatefulWidget
// 7. StatelessWidget
// 8. StatefulWidget
// 9. StatelessWidget
// 10. StatefulWidget
//     <!-- https://dart.dev/language/keywords -->
//     You can see the documentation for more

// <!-- data types -->

// Numbers (int, double)
// Strings (String)
// Booleans (bool)
// Records ((value1, value2))
// Functions (Function)
// Lists (List, also known as arrays)
// Sets (Set)
// Maps (Map)
// Runes ( Runes ; often replaced by the characters API)
// Symbols (Symbol)
// The value null (Null)

// constants
const name = "tashif";
const age = 16;
const twiceTheAge = age * 2;

// variables
var name2 = "tariz";
final name3 = "safa";

// functions
String getFullName(firstName, lastName) {
  return "$firstName $lastName";
}
// print(getFullName("Tashif", "Madani"))

// controller statements and collections
void test() {
  final name = "foo";
  if (name == "foo") {
    print('Yes, this is foo');
  } else if (name == 'bar') {
    print('yes, its bar');
  } else {
    print('Nothing matched');
  }
}

// test();

// operators
void test2() {
  var age = 20;
  final halfOfAge =
      age / 2; //infix operator : In RHS,if there is a condition on LHS and RHS
  final doubleOfAge =
      age * 2; //infix operator : In RHS,if there is a condition on LHS and RHS
  final ageMinusOne = --age; //prefix operator : if only one condition
  print(halfOfAge);
  print(doubleOfAge);
  print(ageMinusOne);
  print(age);
}

// lists
// check the documentation for more lists

void test3() {
  var name = ['foo', 'bar', 'baz'];
  var nameLength = name.length;
  print(nameLength);
  name.add('gag');
  print(name[0]);
  print(name);
}

// sets
// check the documentation for more sets
// dublicates are not allowed

void test4() {
  var name = {'foo', 'bar', 'baz'};
  name.add("foo");
  name.add("bar");
  name.add("baz");
  print(name);
}

// Maps
// check the documentation for more maps
// https://api.dart.dev/dart-core/Map-class.html
// dublicates are not allowed
void test5() {
  var person = {'name': 'tashif', 'age': '26'};
  print(person);
}

// Null safety

void test6() {
  String? name = null;
  print(name);
  name = "tashihf";
  print(name);
}

// making the type nullable
void test7() {
  List<String?>? names = ['ras', 'fas', null];
  // the ? in the <string?> says that values in the list can be null.
  // the ? after the <string>? says that the list can be null.
  print(names);
  names = null;
  print(names);
}

// cherry picking non-nullable values
// ?? operator
void test8() {
  const String? firstName = null;
  const String? middleName = null;
  const String? lastName = "Baz";

  const notNullValue = firstName ?? middleName ?? lastName;
  print(notNullValue);
  // explaination
  // if firstName is null then middleName is checked
  // if middleName is null then lastName is checked
  // if lastName is null then null is returned
  // if any of the values is not null then that value is returned
}

// null aware operator ??=
void test9(String? firstName, String? middleName, String? lastName) {
  String? name = firstName;
  name ??= middleName;
  name ??= lastName;
  print(name);

  // explaination
  // if firstName is null then middleName is checked
  // if middleName is null then lastName is checked
  // if lastName is not null then lastName is assigned to name
  // if lastName is null then name is assigned to null
}

// test9(null,null,'baz')

// conditional invocation
void test10() {
  String? name = null;
  print(name?.length);
}

// 🧠 Quick Summary
// Operator	Meaning	Example	Result

// ??	Use right value if left is null
// ?.	Safe property/method access. ->	obj?.prop
// ??=	Assign only if null. ->	a ??= b

//------------------------ chapter 6 : Enumerations,classes and objects (3hr:28mins)------------------------//
// Enumerations: are named list of related items

enum Personproperties { firstName, lastName }

void test11() {
  var person = Personproperties.firstName;
  print(person.name);
}

// switch statements
enum AnimalType { cat, dog, bunny }

void test12(AnimalType animaltype) {
  switch (animaltype) {
    case AnimalType.cat:
      print(animaltype);
      print("cat");
      break;
    case AnimalType.dog:
      print(animaltype);
      print("dog");
      break;
    case AnimalType.bunny:
      print(animaltype);
      print("bunny");
      break;
  }
  print("Function is finished");
}

// test12(AnimalType.cat);

// classes and objects
// instances are objects and objects are created from classes or objects are the instance of class

class Person {
  void run() {
    print("Person is running");
  }

  void breathe() {
    print("Person is breathing");
  }
}

void test13() {
  final person = Person();
  person.run();
  person.breathe();

  // You can't do this. first, we have to make the copy/instantiate then we can access the properties
  // person = Person();
  // Person.run()
  // Person.breathe()
}

// constructor and methods
// Allows you to create an instance of a class with optional parameters
class Person1 {
  final String name;

  // constructor
  Person1(this.name);
  // this keyword refers to the current instance of the class

  //methods
  void printName() {
    print(name);
  }
}

void test14() {
  final person = Person1("John");
  person.printName();
}

// Inheritance and subclassing
class LivingThing {
  void breathe() {
    print("Breathing");
  }

  void sleep() {
    print("Sleeping");
  }
}

class Cat extends LivingThing {
  //subclassing

  void meow() {
    print("Meowing");
  }
}

void test15() {
  final cat = Cat();
  cat.breathe();
  cat.sleep();
  cat.meow();
}

// abstract classes : classes that can't be instantiated
abstract class LivingThing2 {
  void breathe() {
    print("Breathing");
  }

  void sleep() {
    print("Sleeping");
  }
}

class Cat2 extends LivingThing2 {}

void test16() {
  // final cat = LivingThing2();// Abstract classes can't be instantiated.
  // cat.breathe();
  // cat.sleep();
}

// factory constructors
// can return instances that are not of the same class
// check docs for more

class Cat3 {
  final String name;

  Cat3(this.name);
  factory Cat3.fluffball() {
    return Cat3("Fluff ball");
  }
}

void test17() {
  final cat = Cat3.fluffball();
  print(cat.name);
}

// custom operators

class Cat4 extends Object {
  //can omit extends Object bcz this is same as class cat4{}
  final String name;

  Cat4(this.name);

  //By default, the == operator checks if the memory address of the object is the same.
  //operator == :- overrides the == operator to check if the name of the object is the same.
  // covariant :- by default parameter expects an object but we can override it with covariant
  @override
  operator ==(covariant Cat4 other) => other.name == name;

  // and hashCode :- overrides the hashCode to check if the name of the object is the same.
  //By default, the hash code is the memory address of the object.
  //But we want to use the name of the object as the hash code.
  @override
  int get hashCode => name.hashCode;
}

void test18() {
  final cat1 = Cat4('foo');
  final cat2 = Cat4('foo');
  if (cat1 == cat2) {
    print('cat1 and cat2 are the equal');
    //before override, cat1 and cat2 are not equal
  } else {
    print('They are not equal');
  }
}

//////////////////////////////////////////////////////////

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    test18();
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
    );
  }
}
