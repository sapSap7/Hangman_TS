import { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Guess from "./Guess";
import words from "../words.json";
import DrawMan from "./DrawMan";
import { toast, Toaster } from "react-hot-toast";
import restart from "../assets/restart.png";
import Hint from "./Hint";
import "./GamePage.css";

export default function GamePage() {
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (category) {
      const categoryWords = words[category as keyof typeof words];
      const randomWord =
        categoryWords[Math.floor(Math.random() * categoryWords.length)];
      setWordToGuess(randomWord);
      setGuessLetters([]);
      setIsGameOver(false);
    }
  }, [category]);

  const [wordToGuess, setWordToGuess] = useState<string>("");

  const [guessLetters, setGuessLetters] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const activeLetters = guessLetters.filter((letter) =>
    wordToGuess.includes(letter)
  );

  const inactiveLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const incorrectGuesses = guessLetters.filter((l) => !wordToGuess.includes(l));

  const isWordGuessed = wordToGuess
    .split("")
    .every((letter) => letter === "-" || guessLetters.includes(letter));

  useEffect(() => {
    if (!wordToGuess || guessLetters.length === 0) return;

    if (isGameOver) {
      if (isWordGuessed) {
        toast.success("You got it");
      } else {
        toast.error("better luck next time");
      }
    }
  }, [isGameOver, isWordGuessed, guessLetters.length, wordToGuess]);

  function addGuessedLetter(letter: string) {
    if (guessLetters.includes(letter) || isGameOver) return;
    setGuessLetters((currentLetters) => [...currentLetters, letter]);
  }

  useEffect(() => {
    if (!wordToGuess || guessLetters.length === 0) return;

    const incorrectGuesses = guessLetters.filter(
      (l) => !wordToGuess.includes(l)
    );

    if (incorrectGuesses.length >= 6 || isWordGuessed) {
      setIsGameOver(true);
    }
  }, [guessLetters, wordToGuess, isWordGuessed]);

  return (
    <div className="game-page-container">
      <Toaster />

      {!wordToGuess ? (
        <div className="category-select-container">
          <label htmlFor="category">Choose a category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="movies">Movies</option>
            <option value="animals">Animals</option>
            <option value="countries">Countries</option>
          </select>
        </div>
      ) : (
        <>
          <div className="header-container">
            <div className="guess-container">
              <Guess
                guessLetters={guessLetters}
                wordToGuess={wordToGuess}
                result={isGameOver}
              />
            </div>
            <div className="hint-container">
              <Hint
                wordToGuess={wordToGuess}
                guessLetters={guessLetters}
                onReveal={(letter) => addGuessedLetter(letter)}
                disabled={isGameOver || guessLetters.length >= 6}
              />
            </div>
            <button
              onClick={() => window.location.reload()}
              className="restart-button"
            >
              <img src={restart} alt="restart" className="restart-icon" />
            </button>
          </div>
          <div className="game-essentials-container">
            <div className="draw-man-container">
              <DrawMan numberOfGuesses={incorrectGuesses.length} />
            </div>
            <Keyboard
              activeLetters={activeLetters}
              inactiveLetters={inactiveLetters}
              addGuessedLetter={addGuessedLetter}
              disabled={isGameOver}
            />
          </div>
        </>
      )}
    </div>
  );
}
