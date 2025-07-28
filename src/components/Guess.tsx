import "./Guess.css";

type GuessProps = {
  guessLetters: string[];
  wordToGuess: string;
  result?: boolean;
};

export default function Guess({
  guessLetters,
  wordToGuess,
  result = false,
}: GuessProps) {
  return (
    <div className="guess-container">
      {wordToGuess.split("").map((letter, index) => {
        if (letter === " ") {
          return null;
        }
        if (letter === "-") {
          return <div key={index} style={{ width: "2.5rem" }}></div>;
        }

        const isGuessed = guessLetters.includes(letter) || result;
        const isMissed = !guessLetters.includes(letter) && result;

        return (
          <div className="letter-box" key={index}>
            <span
              className={`letter ${isMissed ? "missed" : ""}`}
              style={{ visibility: isGuessed ? "visible" : "hidden" }}
            >
              {letter}
            </span>
          </div>
        );
      })}
    </div>
  );
}
