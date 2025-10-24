// //////////////////type casting in Dart////////////////
Text(data['questionIndex'] as String) //telling dart to treat the value as a String
Text(data['questionIndex'] as int) //telling dart to treat the value as an int

// private classes in Dart properties can also be private
class _PrivateClass {
  String name;

  _PrivateClass(this.name);

  void _display() {
    print("Name: $name");
  }
}
//////////////////////// getters and methods//////////////////
List<String> get shuffledAnswers {
    final shuffledList = List.of(
      answers,
    ); //copy the list of answers and then shuffle
    shuffledList.shuffle();
    return shuffledList;
  }
//   methods 
List<String>  getShuffledAnswers(){
    final shuffledList = List.of(
      answers,
    ); //copy the list of answers and then shuffle
    shuffledList.shuffle();
    return shuffledList;
  }

// ////////////  passing the values acreoos the widgets/////////
ResultScreen(
        chosenAnswers: selectedAnswer,
        onRestart: restartQuiz,
);

////////////////////////// ternary expressions////////////////////////
var screenWidget = activeScreen == 'start-screen'
        ? StartScreen(switchScreen)
        : QuestionsScreen(onSelectAnswer: chooseAnswer);

// //////////// keyvalue type which is Map  for type safety////////////
final Map<String, Object> data = {
  'questionIndex': 0,
  'questions': [
    'What\'s your favorite color?',
    'What\'s your favorite animal?',
  ],
};
then accessing the values we should use type casting

////////////// SingleChildScrollView for scrolling//////////// 
SingleChildScrollView(
  child: Column(
    children: [
      // Your widgets here
    ],
  ),
);

// map and where methods on lists
map is used to transform each element in a list
where is used to filter elements based on a condition

// spread operator
var list1 = [1, 2, 3];
var list2 = [0, ...list1, 4]; // list2 will be [0, 1, 2, 3, 4]

// spread operator can be used to pull out elements from another list and include them in a new list with a coma separating them

//////////////////Positioned arguments and named arguments/////////////////////
// Positional arguments are based on the order of the arguments
// In Flutter, many widget constructors use named parameters to improve code readability and flexibility. Named parameters allow you to specify arguments by name rather than by position, making it clear what each argument represents. Here's an example of using named parameters in a Flutter widget:

void greet(String name, int age) {
  print("Hello $name, you are $age years old.");
}
greet("Alice", 30); // Positional arguments
// Named arguments are based on the names of the arguments
void greet({required String name, required int age}) {
  print("Hello $name, you are $age years old.");
}
greet(name: "Alice", age: 30); // Named arguments