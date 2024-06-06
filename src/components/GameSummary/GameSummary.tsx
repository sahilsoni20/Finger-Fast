import styles from "./styles.module.css";

type GameSummaryProps = {
  calculateWPM: () => string | 0;
  points: number;
  mistakes: number;
  earnedPoints: number;
  handelReplay: () => void;
};

export default function GameSummary({
  calculateWPM,
  points,
  mistakes,
  earnedPoints,
  handelReplay,
}: GameSummaryProps) {
  return (
    <div className={styles.wrapper}>
      <p>WPM: {calculateWPM()}</p>
      <p>Total Points: {points - mistakes + earnedPoints}</p>
      <p>Total earned points: {earnedPoints}</p>
      <p>Letter Missed: {mistakes}</p>
      <p>
        Total Points Calculations:{" "}
        <span>{`(${points} points) - (${mistakes} mistakes) + (${earnedPoints} earned points) = %{${
          points - mistakes + earnedPoints
        }`}</span>{" "}
      </p>
      <button onClick={handelReplay} className={styles.button}>
        Play Again 
      </button>
    </div>
  );
}
