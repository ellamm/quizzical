import styles from "./question.module.css";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import classNames from "classnames";
import { nanoid } from "nanoid";

export default function Question({
  id,
  question,
  correctAnswer,
  incorrectAnswers,
  selectedAnswer,
  showAnswer,
  handleSelectedAnswer,
}) {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    const shuffledAnswered = allAnswers.sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswered);
  }, [correctAnswer, incorrectAnswers]);

  const answerElements = answers.map((answer) => {
    const allClasses = classNames(
      styles.answerBtn,

      showAnswer
        ? {
            [styles.correctAnswer]: answer === correctAnswer,
            [styles.wrongAnswer]:
              answer === selectedAnswer && answer !== correctAnswer,
            [styles.notSelectedAnswer]:
              answer !== selectedAnswer && answer !== correctAnswer,
          }
        : {
            [styles.selectedAnswer]: answer === selectedAnswer,
          }
    );

    return (
      <button
        key={nanoid()}
        className={allClasses}
        onClick={() => handleSelectedAnswer(id, answer)}
        disabled={showAnswer}
      >
        {decode(answer)}
      </button>
    );
  });
  return (
    <fieldset className={styles.questionContainer}>
      <legend className={styles.questionTitle}>{decode(question)}</legend>
      <div className={styles.answersContainer}>{answerElements}</div>
    </fieldset>
  );
}
