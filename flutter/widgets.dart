MaterialApp(
  home: Scaffold(
    appBar: AppBar(
      title: Text('My App'),
    ),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Hello, World!',
          ),
            Container(
                width: 100,
                height: 100,
                color: const Color.fromARGB(255, 0, 122, 255),
            ),
        ],
        ),
    ),
    ),
);

Text('')
Container()
Expanded(
  child: Container(),
)
Row(
  children: [
    Container(),
    Container(),
  ],
)
Column(
  children: [
    Container(),
    Container(),
  ],
)
SizedBox(
  width: 100,
  height: 100,
  child: Container(),
)
Padding(
  padding: const EdgeInsets.all(8.0),
  child: Container(),
)
Center(
  child: Container(),
)
Stack(
  children: [
    Container(),
    Positioned(
      top: 10,
      left: 10,
      child: Container(),
    ),
  ],
)
ListView(
  children: [
    Container(),
    Container(),
  ],
)
GridView.count(
  crossAxisCount: 2,
  children: [
    Container(),
    Container(),
  ],
)
ElevatedButton(
  onPressed: () {
    // Handle button press
  },
  child: Text('Click Me'),
  style: ElevatedButton.styleFrom(
    primary: Colors.blue, // Named parameter for button color
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8), // Named parameter for padding
  ),
);

// more widgets 
TextField(
  decoration: InputDecoration(
    labelText: 'Enter your name', // Named parameter for label text
    border: OutlineInputBorder(), // Named parameter for border style
  ),
)
Checkbox(
  value: true,
  onChanged: (bool? newValue) {
    // Handle checkbox state change
  },
)
Switch(
  value: false,
  onChanged: (bool newValue) {
    // Handle switch state change
  },
)
Slider(
  value: 0.5,
  onChanged: (double newValue) {
    // Handle slider value change
  },
)
AppBar(
  title: Text('My App Bar'), // Named parameter for title
  backgroundColor: Colors.blue, // Named parameter for background color
)
BottomNavigationBar(
  items: [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.settings),
      label: 'Settings',
    ),
  ],
)
Scaffold(
  appBar: AppBar(
    title: Text('My Scaffold App'), // Named parameter for title
  ),
  body: Center(
    child: Text('Hello, Scaffold!'),
  ),
)
Drawer(
  child: ListView(
    children: [
      DrawerHeader(
        child: Text('Header'), // Named parameter for header content
      ),
      ListTile(
        title: Text('Item 1'), // Named parameter for item title
        onTap: () {
          // Handle item tap
        },
      ),
    ],
  ),
)
Tooltip(
  message: 'This is a tooltip', // Named parameter for tooltip message
  child: Icon(Icons.info),
)
Card(
  child: Padding(
    padding: const EdgeInsets.all(16.0), // Named parameter for padding
    child: Text('This is a card'),
  ),
)
SingleChildScrollView(
  child: Column(
    children: [
      // Your widgets here
    ],
  ),
);
Spacer();
IconButton(icon:Icons.calender_month, onPressed: (){});
Dropdown();
DropdownButton();
PopupMenuButton();
Dismissible();// A widget that can be dismissed by dragging/swiping for deletion
ScaffoldMessenger();// Used to show SnackBars
ScaffolfMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('This is a snackbar'),
  ),
);
ScaffolfMessenger.of(context).hideCurrentSnackBar();
ScaffolfMessenger.of(context).clearSnackBars();
FractionallySizedBox();// A widget that sizes its child to a fraction of the total available space. 0.0 to 1.0
ChartBar();// A widget to display a single bar in a chart
Expanded();// A widget that expands a child of a Row, Column, or Flex

LaypoutBuilder();// A widget that builds a child based on the parent widget's constraints
MediaQuery();// A widget that provides information about the size and orientation of the screen
MediaQuery.of(context).size; // To get the size of the screen
Orientation orientation = MediaQuery.of(context).orientation; // To get the orientation of the screen
Theme.of(context); // To get the current theme

//////////////////////////////// properties of Text widget////////////////////////////
Text(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    // textDirection: TextDirection.rtl,
    // textAlign: TextAlign.end,
    // overflow: TextOverflow.ellipsis,
    // maxLines: 2,
    // textScaler: TextScaler.linear(2),
    // or
    // textScaleFactor: 2, // Sometime does not work.
    // softWrap: true,
    // semanticsLabel: 'hash sign',
    // style: TextStyle(
      //   color: Colors.red,
      //   fontSize: 20,
      //   fontWeight: FontWeight.bold,
      //   fontStyle: FontStyle.italic,
      //   decoration: TextDecoration.lineThrough,
      // letterSpacing: 2,
      // wordSpacing: 20,
      // foreground: Paint()
      //   ..color = Colors.purple,
      //   ..strokeWidth = 2.0,
      //   ..style=PaintingStyle.stroke,
      // background: Paint()
      //   ..color = Colors.green,
      //   ..strokeWidth = 1.0,
      //   ..style=PaintingStyle.stroke,
      // decoration: TextDecoration.combine([
      //   TextDecoration.underline,
      //   TextDecoration.lineThrough,
      // ]),
      // decoration:TextDecoration.underline,
      // decorationColor: Colors.amber,
      // decorationStyle: TextDecorationStyle.wavy,
      // backgroundColor: Colors.yellow,
      // shadows: [
      //   Shadow(color: Colors.red, offset: Offset(2, 2), blurRadius: 2),
      // ],
    // ),
),

/////////////////////////////same style many text///////////////////////////////////
///
// DefaultTextStyle(
//   style: TextStyle(color: Colors.red),
//   child: Column(children: [Text('Hello World'), Text('Hello World')]),
// ),

/////////////////////////////Span///////////////////////////////////
// text span 
body: Center(
  child: Text.rich(
    TextSpan(
      text: 'Hello',
      style: TextStyle(fontSize: 20),
      children: <InlineSpan>[
        TextSpan(
          text: ' World',
          style: TextStyle(fontSize: 40, color: Colors.amber),
        ),
      ],
    ),
  ),
),

// or 
RichText(
  text: TextSpan(
    text: 'Hello',
    style: TextStyle(fontSize: 20, color: Colors.black),
    children: <InlineSpan>[
      TextSpan(
        text: ' World',
        style: TextStyle(fontSize: 40, color: Colors.amber),
        children: <InlineSpan>[
          TextSpan(
            text: '!',
            style: TextStyle(fontSize: 60, color: Colors.red),
          ),
        ],
      ),
    ],
  ),
),


/////////////////////////////Container widget///////////////////////////////////
// container's parent widget can be Center, Padding, Align, SizedBox,Scaffold, Column and Row etc.
Container(
    // color: Colors.orange,
    // height: 200,
    // width: 200,
    alignment: Alignment.center,
    // padding: EdgeInsets.all(30),
    margin: EdgeInsets.all(30),
    constraints:
        BoxConstraints.expand(), // if enable remove height and width
    // transform: Matrix4.rotationZ(25.0),
    // transform: Matrix4.skew(25.0, 25.0)..rotateZ(25.0),
    decoration: BoxDecoration(
      color: Colors.red,
      border: Border.all(
        color: Colors.orange,
        width: 8,
        style: BorderStyle.solid,
      ),
      // or
      // border: Border(
      //   top: BorderSide(
      //     color: Colors.orange,
      //     width: 8,
      //     style: BorderStyle.solid,
      //   ),
      //   bottom: BorderSide(
      //     color: Colors.orange,
      //     width: 8,
      //     style: BorderStyle.solid,
      //   ),
      //   left: BorderSide(
      //     color: Colors.orange,
      //     width: 8,
      //     style: BorderStyle.solid,
      //   ),
      //   right: BorderSide(
      //     color: Colors.orange,
      //     width: 8,
      //     style: BorderStyle.solid,
      //   ),
      // borderRadius: BorderRadius.all(Radius.circular(30)),
      // or
      borderRadius: BorderRadius.circular(30),
      // or
      // borderRadius: BorderRadius.only(
      //   topLeft: Radius.circular(30),
      //   topRight: Radius.circular(30),
      //   bottomLeft: Radius.circular(30),
      //   bottomRight: Radius.circular(30),
      // ),
      boxShadow: [
        BoxShadow(
          blurRadius: 20,
          color: Colors.grey,
          offset: Offset(0, 10),
          spreadRadius: 20,
        ),
      ],
      // shape: BoxShape.circle,
      // gradient: LinearGradient(
      //   colors: [
      //     Colors.red,
      //     Colors.orange,
      //     Colors.yellow,
      //     Colors.green,
      //     Colors.blue,
      //     Colors.indigo,
      //     Colors.purple,
      //   ],
      // ),

      // or
      gradient: LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Colors.red, Colors.orange],
      ),
      // or
      // gradient: RadialGradient(
      //   colors: [
      //     Colors.red,
      //     Colors.orange,
      //     Colors.yellow,
      //     Colors.green,
      //     Colors.blue,
      //     Colors.indigo,
      //     Colors.purple,
      //   ],
      // ),
    ),
    child: Text('hello world', style: TextStyle(fontSize: 30)),
  ),
