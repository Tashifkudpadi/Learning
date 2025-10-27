import 'package:flutter/material.dart';

import 'package:google_fonts/google_fonts.dart';

final theme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(
    brightness: Brightness.dark,
    seedColor: const Color.fromARGB(255, 131, 57, 0),
  ),
  textTheme: GoogleFonts.latoTextTheme(),
);

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('App Bar')),
        body: Center(
          child: Container(
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
        ),
      ),
    );
  }
}
