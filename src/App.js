import React, { useState, useEffect } from "react";
import ButtonsContainer from "./components/ButtonsContainer";
import DisplayContainer from "./components/DisplayContainer";
import EmojiBubble from "./components/EmojiBubble";
import "./styles.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bubbles, setBubbles] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [poppedEmoji, setPoppedEmoji] = useState('');

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      setBubbles(prev => [...prev, { id: Date.now() + Math.random() }]);
    }, 3000);

    return () => clearInterval(bubbleInterval);
  }, []);

  const handlePop = (emoji) => {
    setPoppedEmoji(emoji);
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 2000);
    setBubbles(prev => prev.slice(1));
  };

  function handleClick(e) {
    const targetValue = e.target.name;
    setDisplay(display + targetValue);
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];

    if (display === "" || operatorsArray.includes(lastCharacter)) return;

    setDisplay((prevDisplay) => {
      return prevDisplay + " " + operator + " ";
    });
  }

  function handleEqual() {
    if (display.slice(-2).includes("+ ", "- ", "* ", "/ ")) return;

    setDisplay("");

    try {
      const resultValue = calculate(display);
      setResult(resultValue);
    } catch (error) {
      setDisplay("Error");
    }
  }

  function calculate(expression) {
    const tokens = expression.split(" ");
    let resultValue = parseInt(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseInt(tokens[i + 1]);

      switch (operator) {
        case "+":
          resultValue += nextNumber;
          break;
        case "-":
          resultValue -= nextNumber;
          break;
        case "*":
          resultValue *= nextNumber;
          break;
        case "/":
          resultValue /= nextNumber;
          break;
        default:
          resultValue = "Error";
      }
    }
    return resultValue;
  }

  function clear() {
    setDisplay("");
    setResult("");
  }

  function backspace() {
    setDisplay(display.slice(0, -1));
  }

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="container">
        <div className="calculator">
          <DisplayContainer
            display={display}
            result={result}
            backspace={backspace}
            clear={clear}
          />
          <ButtonsContainer
            operatorClick={operatorClick}
            handleClick={handleClick}
            handleEqual={handleEqual}
          />
          <p className="text-white">Created by Abdur Rehman</p>
        </div>
      </div>
      {bubbles.map(bubble => (
        <EmojiBubble key={bubble.id} onPop={handlePop} />
      ))}
      {showDialog && (
        <div className="emoji-dialog">
          You popped a {poppedEmoji} bubble!
        </div>
      )}
    </>
  );
}

export default App;
