import React from "react";

export type QuestionType = {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  option: string[];
  answer: string;
};

export type QuestionPropTypes = {
  question: string;
  answer: string;
  options: string[];
  callBack: (e: React.FormEvent<EventTarget>, answer: string) => void;
  name: string;
  score: number;
  currQuestion: number;
  quesLength: number;
};
