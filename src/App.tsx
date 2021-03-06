import React, { useEffect, useState } from "react";
import Gif1 from "./assets/Spinner-1.gif";
import "./App.css";
import QuizQuestions from "./Components/Quiz Questions";
import { QuizDetails } from "./services";
import { QuestionType } from "./Types/questions_type";
function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [score, setScore] = useState(0);
  let [userName, setUserName] = useState("");
  let [quizIntro, setQuizIntro] = useState(true);
  let [questionLength, setQuestionLength] = useState(5);
  let [difficulty, setDifficulty] = useState("easy");
  let [scoreScreen, setScoreScreen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const questions = await QuizDetails(questionLength, difficulty);
      setQuiz(questions);
    }
    fetchData();
  }, [questionLength, difficulty]);

  const handleSubmit = (
    e: React.FormEvent<EventTarget>,
    userAnswer: string
  ) => {
    e.preventDefault();
    const availableQuestion = quiz[currentQuestion];
    if (userAnswer === availableQuestion.answer) {
      setScore(++score);
    }
    if (currentQuestion !== quiz.length - 1)
      setCurrentQuestion(++currentQuestion);
    else {
      setScoreScreen(true);
      setCurrentQuestion(0);
    }
  };
  const handleUserSubmit = (ev: React.FormEvent<EventTarget>) => {
    ev.preventDefault();
    setQuizIntro(false);
  };
  const handleRestart = () => {
    setScoreScreen(false);
    setScore(0);
    setQuizIntro(true);
  };
  if (scoreScreen === true)
    return (
      <div className="score__div">
        <h1 className="quiz__heading">Quiz Application</h1>
        <h1 className="score__h1">Your score is : {score}</h1>
        <button
          type="button"
          onClick={handleRestart}
          className="score__btn"
          value="Restart"
        >
          Restart
        </button>
      </div>
    );
  if (!quiz.length) return <img src={Gif1} alt="loading" className="loading" />;
  return (
    <div className="App">
      <h1 className="quiz__heading">Quiz Application</h1>

      {quizIntro ? (
        <div className="intro__div">
          <form className="intro__form" onSubmit={handleUserSubmit}>
            <input
              type="text"
              required
              className="intro__input"
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="Enter Your Name"
            />
            <div className="form__option">
              <select
                className="quiz__difficulty"
                onChange={(val: any) => setQuestionLength(val.target.value)}
                required
                placeholder="Enter Your Name"
              >
                <option value="" disabled selected hidden>
                  --Select Question Length
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
              <select
                className="quiz__difficulty"
                onChange={(ev) => setDifficulty(ev.target.value)}
                required
              >
                <option value="" disabled selected hidden>
                  --Select Difficulty
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <input type="submit" className="intro__submit" value="Next" />
          </form>
        </div>
      ) : (
        <QuizQuestions
          options={quiz[currentQuestion].option}
          question={quiz[currentQuestion].question}
          answer={quiz[currentQuestion].answer}
          callBack={handleSubmit}
          name={userName}
          score={score}
          currQuestion={currentQuestion}
          quesLength={questionLength}
        />
      )}
    </div>
  );
}

export default App;
