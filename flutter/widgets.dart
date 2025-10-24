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


