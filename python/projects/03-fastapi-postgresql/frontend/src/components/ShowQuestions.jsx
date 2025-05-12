import { useEffect, useState } from "react";

function ShowQuestions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/all-questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleChange = (questionId, selectedIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h2>Quiz</h2>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "1.5rem" }}>
              <strong>{q.question_text}</strong>
              <div>
                {q.choices.map((choice, idx) => {
                  const isSelected = answers[q.id] === idx;
                  const isCorrect = choice.is_correct;

                  let color = "";
                  if (submitted) {
                    if (isSelected && isCorrect) color = "green";
                    else if (isSelected && !isCorrect) color = "red";
                  }

                  return (
                    <div key={idx}>
                      <label style={{ color }}>
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={idx}
                          checked={isSelected || false}
                          onChange={() => handleChange(q.id, idx)}
                          disabled={submitted}
                        />
                        {choice.choice_text}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted && <button type="submit">Submit Answers</button>}
          {submitted && (
            <p>
              <strong>Submitted!</strong> Correct answers are marked in green.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default ShowQuestions;
