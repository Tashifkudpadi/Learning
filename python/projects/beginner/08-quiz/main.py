# List of dictionaries that store question and answer pairs
quiz = [
    {
        "question": "What is the capital of France?",
        "answer": "Paris"
    },
    {
        "question": "What is the capital of Germany?",
        "answer": "Berlin"
    },
    {
        "question": "What is the capital of Italy?",
        "answer": "Rome"
    },
    {
        "question": "What is the capital of Spain?",
        "answer": "Madrid"
    },
]

score = 0

# Loop through each question in the quiz list
for item in quiz:
    print(item['question'])
    answer = input('Answer? ')

    if answer.lower() == item['answer'].lower():
        print('Correct!')
        score += 1
    else:
        print(f'Sorry, that is incorrect. The correct answer was {item["answer"]}')

print("You scored", score, 'out of', len(quiz))  # Final score
print("Your percentage is", int((score / len(quiz)) * 100), "%")  # Final percentage
