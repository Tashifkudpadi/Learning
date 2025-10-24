import 'package:expense_tracker/models/expense.dart';
import 'package:flutter/material.dart';
import 'expenses_list/expenses_list.dart';

class Expenses extends StatefulWidget {
  const Expenses({super.key});
  @override
  State<Expenses> createState() {
    return _ExpensesState();
  }
}

class _ExpensesState extends State<Expenses> {
  final List<Expense> _registeredExpenses = [
    Expense(
      title: 'Flutter Course',
      amount: 19.99,
      date: DateTime.now(),
      category: Category.work,
    ),
    Expense(
      title: 'Cafe Bill',
      amount: 25.5,
      date: DateTime.now(),
      category: Category.food,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(
          children: [
            AppBar(
              title: Text('My App Bar'), // Named parameter for title
              backgroundColor: const Color.fromARGB(
                255,
                127,
                117,
                235,
              ), // Named parameter for background color
            ),
            Text('The Chart'),
            Expanded(child: ExpensesList(expenses: _registeredExpenses)),
            TextField(
              decoration: InputDecoration(
                labelText: 'Enter your name', // Named parameter for label text
                border:
                    OutlineInputBorder(), // Named parameter for border style
              ),
            ),
            BottomNavigationBar(
              items: [
                BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
                BottomNavigationBarItem(
                  icon: Icon(Icons.settings),
                  label: 'Settings',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
