import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Button from "./components/Button";
import Dice from "./components/Dice";
import WinBanner from "./components/WinBanner";

function App() {
  const { width, height } = useWindowSize();

  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [diceArray, setDiceArray] = useState(setNewDiceArray());

  useEffect(() => {
    setIsGameCompleted(
      diceArray.filter((dice) => dice.isLocked === false).length === 0
        ? true
        : false
    );
  }, [diceArray]);

  function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  function createDice() {
    return {
      number: getRandomNumber(),
      isLocked: false,
    };
  }

  function setNewDiceArray() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      let dice = createDice();
      diceArray.push(dice);
    }
    return diceArray;
  }

  function rollDice() {
    setDiceArray((prevArray) =>
      prevArray.map((dice) =>
        dice.isLocked ? dice : { ...dice, number: getRandomNumber() }
      )
    );
  }

  function toggleDiceLock(id) {
    setDiceArray((prevArray) =>
      prevArray.map((dice, index) =>
        index === id ? { ...dice, isLocked: !dice.isLocked } : dice
      )
    );
  }

  function resetGame() {
    setDiceArray(setNewDiceArray());
  }

  return (
    <div className="App">
      {isGameCompleted && <Confetti width={width} height={height} />}
      <div className="outer-box bg-dark">
        <div className="inner-box bg-light rounded-3">
          {isGameCompleted && <WinBanner />}
          <div className="text-center">
            <h1>Tenzies</h1>
            <p>
              To win all dice should be same. <br />
              Click 'Roll' to roll dice. <br />
              Click on each dice to freeze so it would not roll.
            </p>
          </div>
          <div className="dice-box rounded-3 bg-dark p-3 mb-4">
            {diceArray.map((dice, index) => (
              <Dice
                key={index}
                number={dice.number}
                lockStatus={dice.isLocked}
                handleClick={() => toggleDiceLock(index)}
              />
            ))}
          </div>
          <Button
            gameStatus={isGameCompleted}
            handleClick={isGameCompleted ? resetGame : rollDice}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
