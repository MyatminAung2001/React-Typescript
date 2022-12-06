import React from 'react';

type HangmanWordProps = {
    guessWords: string[],
    wordToGuess: string,
    reveal?: boolean
}

const HangmanWord = ({ guessWords, wordToGuess, reveal = false }: HangmanWordProps) => {

    return (
        <div style={{ display: "flex", gap: ".25em", fontSize: "4rem", fontWeight: "bold", textTransform: "uppercase" }}>
            {wordToGuess.split("").map((letter, index) => (
                <span key={index} style={{ borderBottom: ".1em solid black" }}>
                    <span style={{ 
                            visibility: guessWords.includes(letter) || reveal ? "visible" : "hidden" ,
                            color: !guessWords.includes(letter) && reveal ? "red" : "black"
                        }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
};

export default HangmanWord;