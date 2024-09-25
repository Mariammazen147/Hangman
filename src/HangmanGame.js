// HangmanGame.js

import React, { useState, useEffect } from "react";
import HangmanCanvas from "./HangmanCanvas";
import "./HangmanGame.css"; // Import the additional CSS file

const words = [
    "APPLE", "BANANA", "CHERRY", "GRAPEFRUIT", "PINEAPPLE", "MANGO", "STRAWBERRY", "WATERMELON", "BLUEBERRY", "RASPBERRY", 
    "BLACKBERRY", "PEAR", "PEACH", "PLUM", "APRICOT", "ORANGE", "LEMON", "LIME", "KIWI", "COCONUT", "AVOCADO", "FIG", 
    "POMEGRANATE", "GRAPE", "PAPAYA", "GUAVA", "PASSIONFRUIT", "DRAGONFRUIT", "TANGERINE", "NECTARINE", "MELON", 
    "CRANBERRY", "KUMQUAT", "CUCUMBER", "TOMATO", "BROCCOLI", "SPINACH", "CARROT", "POTATO", "PUMPKIN", "SQUASH", 
    "LETTUCE", "CABBAGE", "ONION", "GARLIC", "PEPPER", "RADISH", "TURNIP", "BEET", "PARSNIP", "CELERY", "ZUCCHINI", 
    "KALE", "CAULIFLOWER", "BRUSSELS", "ARTICHOKE", "EGGPLANT", "OKRA", "ASPARAGUS", "CORN", "PEA", "BEAN", 
    "LENTIL", "CHICKPEA", "SOYBEAN", "PEANUT", "ALMOND", "CASHEW", "WALNUT", "PISTACHIO", "PECAN", "HAZELNUT", 
    "MACADAMIA", "SUNFLOWER", "SESAME", "FLAXSEED", "CHIA", "QUINOA", "BARLEY", "OAT", "RICE", "WHEAT", "MILLET", 
    "BUCKWHEAT", "RYE", "SPELT", "AMARANTH", "SORGHUM", "TEFF", "FARRO", "BULGUR", "WILDRICE", "MAPLE", "HONEY", 
    "CHOCOLATE", "VANILLA", "CINNAMON", "GINGER", "NUTMEG", "TURMERIC", "SAFFRON", "CLOVE", "THYME", "OREGANO"
];


const HangmanGame = () => {
    const [word, setWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [mistakes, setMistakes] = useState(0);

    useEffect(() => {
        resetGame();
    }, []);

    const chooseRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toUpperCase();
    };

    const handleGuess = (letter) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!word.includes(letter)) {
                setMistakes(mistakes + 1);
            }
        }
    };

    const isGameWon = () => {
        return word
            .split("")
            .every((letter) => guessedLetters.includes(letter));
    };

    const isGameLost = () => {
        return mistakes >= 6;
    };

    const resetGame = () => {
        setWord(chooseRandomWord());
        setGuessedLetters([]);
        setMistakes(0);
    };

    return (
        <div className="hangman-container">
            <h1>Hangman Game</h1>
            <h5>
                Hangman is a word-guessing game. Start a new game, guess letters
                to reveal the word. Win by guessing the word before the hangman
                is complete. You only have 6 Guesses! Have fun!
            </h5>
            <HangmanCanvas mistakes={mistakes} />
            <div className="word-display">
                {word.split("").map((letter, index) => (
                    <span key={index} className="letter">
                        {guessedLetters.includes(letter) ? letter : "_"}
                    </span>
                ))}
            </div>
            <div className="keyboard">
                {Array.from(Array(26)).map((_, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            handleGuess(String.fromCharCode(65 + index))
                        }
                        disabled={guessedLetters.includes(
                            String.fromCharCode(65 + index)
                        )}
                    >
                        {String.fromCharCode(65 + index)}
                    </button>
                ))}
            </div>
            {isGameWon() && <p className="result-message">You won!</p>}
            {isGameLost() && (
                <p className="result-message">You lost! The word was: {word}</p>
            )}
            <button className="new-game-button" onClick={resetGame}>
                New Game
            </button>
        </div>
    );
};

export default HangmanGame;
