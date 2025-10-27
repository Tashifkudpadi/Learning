import 'package:expense_tracker/models/expense.dart';
import 'package:flutter/material.dart';

class ExpenseItem extends StatelessWidget {
  const ExpenseItem(this.expense, {super.key});

  final Expense expense;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              expense.title,
              style: TextStyle(color: const Color.fromARGB(255, 51, 131, 236)),
            ),
            SizedBox(height: 4),
            Row(
              children: [
                Text('\$ ${expense.amount.toStringAsFixed(2)}'),
                Spacer(),
                Row(
                  children: [
                    Text(expense.formatedDate),
                    const SizedBox(width: 8),
                    Icon(categoryIcons[expense.category]),
                    Text(expense.category.name),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
