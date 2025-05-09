import React from 'react';

function Intro({ setGameStatus }) {

  const handleClick = () => {
    setGameStatus(prevStatus => !prevStatus); // Toggle game status
  }

  return (
    <>
        <h3>Match All The Tiles To Win!</h3>
        <p>Press Start To Play</p>
        <button onClick={handleClick}>Start Game</button>
    </>
  )
}

export default Intro;
