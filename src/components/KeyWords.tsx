import React from 'react';

import styles from "./KeyWords.module.css";

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

type KeyboardProps = {
    disabled?: boolean,
    activeWord: string[],
    inActiveWord: string[],
    addGuessLetter: (word: string) => void
}

const KeyWords = ({ disabled = false, activeWord, inActiveWord, addGuessLetter }: KeyboardProps) => {

    
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr)", gap: ".5rem" }}>
            {KEYS.map((key) => {
                const isActive = activeWord.includes(key)
                const isInActive = activeWord.includes(key)
                return (
                    <button 
                        onClick={() => addGuessLetter(key)} 
                        key={key} 
                        className={`
                            ${styles.btn} 
                            ${isActive ? styles.active : ""}
                            ${isInActive ? styles.inactive : ""}
                        `}
                        disabled={isInActive || isActive || disabled}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
};

export default KeyWords;