import React, { useState, useEffect } from 'react';
import './Game.css';

const ICONS = ['🎯', '🧠', '🌟', '💡', '🔥', '🌈', '🚀', '🐶'];


function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Game({ setGameWon, setTimeTaken }) {
  const [tiles, setTiles] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    // Initialize tiles
    const duplicated = [...ICONS, ...ICONS];
    const shuffled = shuffleArray(duplicated);
    const initialTiles = shuffled.map((icon, index) => ({
      icon,
      isFlipped: false,
      isMatched: false,
      index,
    }));
    setTiles(initialTiles);
    setTiles(initialTiles);
    setSeconds(0); 
    setTimerActive(true);
  }, []);

  const handleClick = (index) => {
    if (tiles[index].isFlipped || tiles[index].isMatched || flippedIndices.length === 2) return;

    const newTiles = [...tiles];
    newTiles[index].isFlipped = true;
    const newFlipped = [...flippedIndices, index];

    setTiles(newTiles);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      if (newTiles[i1].icon === newTiles[i2].icon) {
        // Match found
        newTiles[i1].isMatched = true;
        newTiles[i2].isMatched = true;
        setTiles([...newTiles]);
        setFlippedIndices([]);
      } else {
        // Flip back after short delay
        setTimeout(() => {
          newTiles[i1].isFlipped = false;
          newTiles[i2].isFlipped = false;
          setTiles([...newTiles]);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (tiles.length > 0 && tiles.every(tile => tile.isMatched)) {
      setTimerActive(false);
      setTimeout(() => {
        setTimeTaken(seconds)
        setGameWon(true);
      }, 500);
    }
  }, [tiles]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);
  
  return (
    <div>
    <p>⏱ Time: {seconds} sec</p>
    <div className="game-board" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {tiles.map((tile, index) => (
        <div
          key={index}
          className="tile"
          onClick={() => handleClick(index)}
          style={{ backgroundColor: tile.isFlipped || tile.isMatched ? 'white' : 'blue' }}
        >
          {tile.isFlipped || tile.isMatched ? tile.icon : '?'}
        </div>
      ))}
    </div>
    </div>
  );
}

export default Game;
