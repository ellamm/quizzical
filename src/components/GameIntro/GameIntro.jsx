import styles from "./gameIntro.module.css";
import GameOptions from "../GameOptions/GameOptions";

export default function GameIntro({
  gameOptions,
  handleChange,
  handleGameStart,
  showNoQuestionsError,
}) {
  return (
    <section className={styles.gameIntro}>
      <h1 className={styles.introTitle}>Quizzical</h1>
      <p className={styles.introDescription}>
        Answer the questions and test your knowledge
      </p>

      {showNoQuestionsError && (
        <h2 className={styles.noQuestionsText} aria-live="polite">
          Oops! We couldn't find any questions with these options!
        </h2>
      )}

      <GameOptions gameOptions={gameOptions} handleChange={handleChange} />
      <button className="btn" onClick={handleGameStart}>
        Start quiz
      </button>
    </section>
  );
}
