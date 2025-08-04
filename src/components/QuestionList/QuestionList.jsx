import { useEffect, useState } from "react";
import getQuestions from "../../helpers/getQuestions";
import { nanoid } from "nanoid";
import Question from "../Question/Question";
export default function QuestionList({
  gameOptions,
  handleGameStart,
  handleNoQuestionsError,
}) {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const allQuestionsAnswered = questionsArray.every(
    (question) => question.selectedAnswer !== ""
  );
  const correctAnswersCount = questionsArray.filter(
    (question) => question.correct_answer === question.selectedAnswer
  ).length;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setFetchError(null);
      const response = await getQuestions(gameOptions);
      if (!response.success) {
        // Handle no questions found specifically
        if (response.error.includes("No questions found")) {
          handleGameStart();
          handleNoQuestionsError(true);
        } else {
          // Handle other errors gracefully
          setFetchError(response.error);
        }
        setLoading(false);
        return;
      }
      setQuestionsArray(
        response.results.map((question) => ({
          ...question,
          id: nanoid(),
          selectedAnswer: "",
          showAnswer: false,
        }))
      );
      setLoading(false);
    };
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectedAnswer = (questionId, answer) => {
    if (!isGameOver) {
      setQuestionsArray((prevQuestionArray) =>
        prevQuestionArray.map((question) =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  };

  const checkAnswers = () => {
    if (allQuestionsAnswered) {
      setIsGameOver(true);
      setQuestionsArray((prevQuestionsArray) =>
        prevQuestionsArray.map((question) => ({
          ...question,
          showAnswer: true,
        }))
      );
    }
  };

  const resetGame = () => {
    handleGameStart();
  };

  const questionElements = questionsArray.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      selectedAnswer={question.selectedAnswer}
      showAnswer={question.showAnswer}
      handleSelectedAnswer={handleSelectedAnswer}
    />
  ));

  if (loading) {
    return <h2>Loading questions...</h2>;
  }

  if (fetchError) {
    const message =
      fetchError === "API response status: 429"
        ? "Too many requests, please wait 10s "
        : fetchError;
    return (
      <section>
        <h2>Error loading questions</h2>
        <p>{message}</p>
        <button className="btn" onClick={resetGame}>
          Go back
        </button>
      </section>
    );
  }

  return (
    <section>
      {questionElements}
      <div role="status" aria-live="polite">
        {isGameOver && (
          <h3>
            You scored {correctAnswersCount}/{questionsArray.length} correct
            answers
          </h3>
        )}
        <button
          className="btn start-btn"
          onClick={isGameOver ? resetGame : checkAnswers}
          disabled={!allQuestionsAnswered}
        >
          {isGameOver ? "Play again" : "Check Answers"}
        </button>
      </div>
    </section>
  );
}
