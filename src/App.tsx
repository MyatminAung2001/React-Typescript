import { useCallback, useEffect, useState } from 'react'
import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import KeyWords from './components/KeyWords';
import words from './wordList.json';

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {

  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessWords, setGuessWords] = useState<string[]>([]);

  const inCorrectWords = guessWords.filter(
    words => !wordToGuess.includes(words)
  );

  const isLoser =  inCorrectWords.length >= 6
  const isWinner = wordToGuess.split("").every(word => guessWords.includes(word))
  
  const addGuessLetter = useCallback((word: string) => {
    if (guessWords.includes(word) || isLoser || isWinner) return;
  
    setGuessWords(currentWords => [...currentWords, word]);
  }, [guessWords, isWinner, isLoser]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault()
      addGuessLetter(key);
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessWords]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return
      e.preventDefault()
      setGuessWords([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    }
  })
  
  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Wiinner! - Refrest to try again"}
        {isLoser && "Nice Try! - Refrest to try again"}
      </div>
      <HangmanDrawing numberOfGuess={inCorrectWords.length} />
      <HangmanWord reveal={isLoser} guessWords={guessWords} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <KeyWords 
          disabled={isWinner || isLoser}
          activeWord={guessWords.filter(word => wordToGuess.includes(word))} 
          inActiveWord={inCorrectWords}
          addGuessLetter={addGuessLetter}
        />
      </div>
    </div>
  )
}

export default App
