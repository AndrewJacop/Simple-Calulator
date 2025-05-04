import React, { useState, useEffect } from "react";
import ButtonsContainer from "./components/ButtonsContainer";
import DisplayContainer from "./components/DisplayContainer";
import "./styles.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply the theme class to the body element
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  function handleClick(e) {
    const targetValue = e.target.name;
    setDisplay(display + targetValue);
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];

    console.log(lastCharacter);

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

  return (
    <>
      {/* Add the theme toggle button */}
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
    </>
  );
}

export default App;
