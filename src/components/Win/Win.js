    import React from 'react';

    function Win({ playAgain }) {
    return (
        <div>
        <h2>🎉 You Won!</h2>
        <p>Great job matching all the tiles.</p>
        <button onClick={playAgain}>Play Again</button>
        </div>
    );
    }

    export default Win;
