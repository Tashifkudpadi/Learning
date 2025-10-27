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

////////////////////// dispose, initState, and setState methods/////////////////////
// dispose, initState, and setState are methods used in Flutter's StatefulWidget lifecycle to manage state and resources.
// initState is called when the widget is first created. It's used to initialize state and set up resources.
@override
void initState() {
  super.initState();
  // Initialization code here
}
// dispose is called when the widget is removed from the widget tree. It's used to clean up resources.
@override
void dispose() {
  // Cleanup code here
  super.dispose();
}
// setState is used to update the state of the widget and trigger a rebuild of the UI.
setState(() {
  // Update state here
});

///////////////////////// Navigator for navigation between screens/////////////////////
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondScreen()),
);
Navigator.pop(context); // To go back to the previous screen

////////////////////// showDatePicker and showModalBottomSheet/////////////////////

showDatePicker(
  context: context,
  initialDate: DateTime.now(),
  firstDate: DateTime(2000),
  lastDate: DateTime(2100),
).then((selectedDate) {
  if (selectedDate != null) {
    // Handle the selected date
  }
});

showModalBottomSheet(
  context: context,
  builder: (BuildContext context) {
    return Container(
      height: 200,
      color: Colors.white,
      child: Center(
        child: Text('This is a modal bottom sheet'),
      ),
    );
  },
);

showDialog(
  context: context,
  builder: (BuildContext context) {
    return AlertDialog(
      title: Text('Alert'),
      content: Text('This is an alert dialog.'),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text('OK'),
        ),
      ],
    );
  },
);
and more show functions like showAboutDialog, showTimePicker, showLicensePage, showSearch, showGeneralDialog, showCupertinoModalPopup etc.

////////////////////// async and await keywords/////////////////////
Future<void> fetchData() async {
  // Simulate a network request
  await Future.delayed(Duration(seconds: 2));
  print('Data fetched');
}

// ////////////////////////////////// ///////////////////////
useSafeArea: true, // Ensures content is displayed within safe areas of the device basically avoiding notches and rounded corners
Navigator.of(context).pushNamed('/routeName'); // To navigate using named routes
Navigator.of(context).pop(); // To go back to the previous screen
Navigator.of(context).pushReplacementNamed('/routeName'); // To replace the current screen with a new one
Navigator.of(context).pushAndRemoveUntil(
  MaterialPageRoute(builder: (context) => NewScreen()),
  (Route<dynamic> route) => false,
); // To clear the navigation stack and push a new screen
Future.delayed(Duration(seconds: 2), () {
  // Code to execute after a delay
});

/////////////////// cupertino widgets for iOS style//////////////////////
import 'package:flutter/cupertino.dart';
CupertinoButton(
  child: Text('Press Me'),
  onPressed: () {
    // Handle button press
  },
);

showCupertinoDialog(
  context: context,
  builder: (BuildContext context) {
    return CupertinoAlertDialog(
      title: Text('Alert'),
      content: Text('This is an iOS-style alert dialog.'),
      actions: [
        CupertinoDialogAction(
          child: Text('OK'),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
      ],
    );
  },
);

// check the platform 
 if (Platform.isIOS) {
    // Use Cupertino widgets for iOS
  } else {
    // Use Material widgets for Android and other platforms
  }