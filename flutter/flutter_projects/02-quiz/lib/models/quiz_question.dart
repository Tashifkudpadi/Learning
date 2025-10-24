// blue print for QuizQuestion class to build standard question and answers and also for building the standard objects that dont act like widgets
class QuizQuestion {
  const QuizQuestion(this.text, this.answers);

  final String text;
  final List<String> answers;

  List<String> get shuffledAnswers {
    final shuffledList = List.of(
      answers,
    ); //copy the list of answers and then shuffle
    shuffledList.shuffle();
    return shuffledList;
  }
}
