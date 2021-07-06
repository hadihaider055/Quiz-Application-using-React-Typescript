import React, { useState } from "react";
import { QuestionPropTypes } from "../../Types/questions_type";
import "../../App.css";
const QuizQuestions: React.FC<QuestionPropTypes> = ({
  options,
  question,
  answer,
  callBack,
  name,
  score,
  currQuestion,
  quesLength,
}) => {
  let [userSelection, setUserSelection] = useState("");
  const handleSelection = (event: any) => {
    setUserSelection(event.target.value);
  };
  return (
    <>
      <div className="quiz__field">
        <div className="quiz__field__header">
          <p className="quiz__header__name">Welcome {name}!</p>
          <p className="quiz__header__score">Score: {score}</p>
        </div>
        <div className="quiz__field__body">
          <h4 className="quiz__question">{question}</h4>
          <form
            onSubmit={(e: React.FormEvent<EventTarget>) =>
              callBack(e, userSelection)
            }
          >
            {options.map((opt: string, ind) => {
              return (
                <label key={ind} className="quiz__label">
                  <input
                    className="quiz__radio"
                    type="radio"
                    name="quiz_option"
                    id="quiz_option"
                    value={opt}
                    checked={userSelection === opt}
                    required
                    onChange={handleSelection}
                  />
                  {opt}
                  <br />
                </label>
              );
            })}
            <input type="submit" className="quiz__submit" value="Submit" />
          </form>
          <h6 className="quiz__question__length">
            Question {currQuestion + 1} of {quesLength}
          </h6>
        </div>
      </div>
    </>
  );
};

export default QuizQuestions;
