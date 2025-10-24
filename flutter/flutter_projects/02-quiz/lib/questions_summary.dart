import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class QuestionsSummary extends StatelessWidget {
  const QuestionsSummary({super.key, required this.summaryData});

  final List<Map<String, Object>> summaryData;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 400,
      child: SingleChildScrollView(
        child: Column(
          children: summaryData.map((data) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Circular index badge
                Container(
                  width: 35,
                  height: 35,
                  alignment: Alignment.center,
                  margin: const EdgeInsets.only(right: 10, top: 5),
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(149, 111, 143, 246),
                    shape: BoxShape.circle, // makes it circular
                  ),
                  child: Text(
                    ((data['questionIndex'] as int) + 1).toString(),
                    style: GoogleFonts.lato(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),

                // Question and answers
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        data['question'] as String,
                        style: GoogleFonts.lato(
                          color: Colors.white,
                          fontSize: 18,
                        ),
                        textAlign: TextAlign.left,
                      ),
                      const SizedBox(height: 5),
                      Text(
                        data['selectedAnswer'] as String,
                        style: GoogleFonts.lato(
                          color: const Color.fromARGB(255, 255, 247, 0),
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        data['correctAnswer'] as String,
                        style: GoogleFonts.lato(
                          color: const Color.fromARGB(148, 29, 74, 222),
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 30),
                    ],
                  ),
                ),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }
}
