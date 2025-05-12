import React, { useState } from "react";

const CreateQuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState([
    { choice_text: "", is_correct: false },
  ]);

  const isAnyChecked = choices.some((choice) => choice.is_correct);

  const handleChoiceChange = (index, field, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index][field] = field === "is_correct" ? value : value;
    setChoices(updatedChoices);
  };

  const addChoice = () => {
    setChoices([...choices, { choice_text: "", is_correct: false }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      question_text: questionText,
      choices: choices.map(({ choice_text, is_correct }) => ({
        choice_text,
        is_correct,
      })),
    };

    try {
      const res = await fetch("http://localhost:8000/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Submission failed:", errorData);
        alert("Failed to submit");
      } else {
        alert("Question submitted!");
        setQuestionText("");
        setChoices([{ choice_text: "", is_correct: false }]);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Create a Question</h2>
        <input
          type="text"
          placeholder="Enter question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
        <h3>Choices</h3>
        {choices.map((choice, idx) => (
          <div key={idx} style={{ display: "flex" }}>
            <input
              type="text"
              placeholder={`Choice ${idx + 1}`}
              value={choice.choice_text}
              onChange={(e) =>
                handleChoiceChange(idx, "choice_text", e.target.value)
              }
              required
            />
            <label>
              <input
                type="checkbox"
                checked={choice.is_correct}
                onChange={(e) =>
                  handleChoiceChange(idx, "is_correct", e.target.checked)
                }
              />
              Correct?
            </label>
          </div>
        ))}
        <button type="button" onClick={addChoice}>
          Add Choice
        </button>
        <button type="submit" disabled={!isAnyChecked}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
