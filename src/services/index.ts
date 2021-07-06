import { QuestionType } from "../Types/questions_type";
const suffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
export const QuizDetails = async (
  totalQuestions: number,
  difficultyLevel: string
): Promise<QuestionType[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficultyLevel}&type=multiple`
  );
  let { results } = await res.json();
  const quiz = results.map((questionObj: QuestionType) => {
    return {
      question: questionObj.question,
      answer: questionObj.correct_answer,
      option: suffleArray(
        questionObj.incorrect_answers.concat(questionObj.correct_answer)
      ),
    };
  });
  return quiz;
};
