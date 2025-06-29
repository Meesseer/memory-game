import './App.css';
import Intro from './components/Intro/Intro';
import Game from './components/Game/Game';
import Win from './components/Win/Win';
import { useState } from 'react';

function App() {
  const [gameStatus, setGameStatus] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

  const resetGame = () => {
    setGameWon(false);
    setGameStatus(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        Let's Test Your Memory
        {gameWon ? (
          <Win playAgain={resetGame} timeTaken={timeTaken}/>
        ) : gameStatus ? (
          <Game setGameWon={setGameWon} setTimeTaken={setTimeTaken} />
        ) : (
          <Intro setGameStatus={setGameStatus}/>
        )}
      </header>
    </div>
  );
}

export default App;
