import { useState } from "react";
import "./App.css";
import GameIntro from "./components/GameIntro/GameIntro";
import QuestionList from "./components/QuestionList/QuestionList";
import shapeTop from "./assets/images/shape-top.png";
import shapeDown from "./assets/images/shape-down.png";
function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showNoQuestionsError, setShowNoQuestionsError] = useState(false);
  const [gameOptions, setGameOptions] = useState({
    category: "",
    difficulty: "",
    type: "",
    amount: "5",
  });

  function handleGameStart() {
    setGameStarted((prevState) => !prevState);
  }

  const handleNoQuestionsError = (boolean) => {
    setShowNoQuestionsError(boolean);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameOptions((prevGameOptions) => {
      return {
        ...prevGameOptions,
        [name]: value,
      };
    });
  };

  return (
    <>
      <main>
        <img src={shapeTop} alt="" className="shape-top"></img>
        {gameStarted ? (
          <QuestionList
            gameOptions={gameOptions}
            handleGameStart={handleGameStart}
            handleNoQuestionsError={handleNoQuestionsError}
          />
        ) : (
          <GameIntro
            gameOptions={gameOptions}
            handleChange={handleChange}
            handleGameStart={handleGameStart}
            showNoQuestionsError={showNoQuestionsError}
          />
        )}
        <img src={shapeDown} alt="" className="shape-down"></img>
      </main>
    </>
  );
}

export default App;
