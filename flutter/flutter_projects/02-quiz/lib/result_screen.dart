import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:quiz/data/questions.dart';
import 'package:quiz/questions_summary.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({
    super.key,
    required this.chosenAnswers,
    required this.onRestart,
  });

  final List<String> chosenAnswers;
  final void Function() onRestart;

  // List<Map<String, Object>> getSummaryData() {
  //   final List<Map<String, Object>> summaryData = [];
  //   for (var i = 0; i < chosenAnswers.length; i++) {
  //     summaryData.add({
  //       'questionIndex': i,
  //       'question': questions[i].text,
  //       'selectedAnswer': chosenAnswers[i],
  //       'correctAnswer': questions[i].answers[0],
  //     });
  //   }
  //   return summaryData;
  // }

  // or you can uuse get method
  List<Map<String, Object>> get summaryData {
    final List<Map<String, Object>> summaryData = [];
    for (var i = 0; i < chosenAnswers.length; i++) {
      summaryData.add({
        'questionIndex': i,
        'question': questions[i].text,
        'selectedAnswer': chosenAnswers[i],
        'correctAnswer': questions[i].answers[0],
      });
    }
    return summaryData;
  }

  @override
  Widget build(BuildContext context) {
    final totalQuestions = questions.length;
    final correctQuestions = summaryData
        .where(
          (data) =>
              (data['selectedAnswer'] as String) ==
              (data['correctAnswer'] as String),
        )
        .length;

    final percentage = (correctQuestions / totalQuestions) * 100;
    // convert pert in decimal

    return SizedBox(
      width: double.infinity,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 40),
        child: Column(
          // mainAxisAlignment: MainAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // QuestionsSummary(summaryData: getSummaryData()),
            Text(
              'You answered $correctQuestions out of $totalQuestions questions correctly!',
              style: GoogleFonts.lato(
                color: Colors.white,
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            Text(
              'Your percentage is ${percentage.toStringAsFixed(2)}%',
              style: GoogleFonts.lato(
                color: const Color.fromARGB(255, 248, 241, 98),
                fontSize: 20,
              ),
              textAlign: TextAlign.center,
            ),
            QuestionsSummary(summaryData: summaryData),
            OutlinedButton.icon(
              onPressed: onRestart,
              icon: const Icon(Icons.refresh),
              label: Text('Restart Quiz'),
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white,
                side: const BorderSide(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
