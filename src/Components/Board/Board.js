import React, { useState } from 'react';
import Square from '../Square/Square';
import r2h from '../../img/r2h.png';
import fellowship from '../../img/fellowships.png';

const Board = () => {
    const initialBoard = Array(9).fill(null)
    const [squares, setSquares] = useState(initialBoard) //Creating the hook
    const [playerXIsNext, setPlayerXIsNext] = useState(true)

    const handleClick = (e) => {
        const newSquares = [...squares]  //make sure not to manipulate the state directly
        const winnerDeclared = Boolean(calculateWinner(squares));

        if (winnerDeclared) return;  // this stops the game once there's a winner. It disable the buttons

        newSquares[e] = playerXIsNext ? 'X' : 'O';
        setSquares(newSquares) // updates
        setPlayerXIsNext(!playerXIsNext) // Switches players by toggleling between true and false
    }

    const getStatus = () => {   // // allow us to see who is next or if there's a winner
     if (winner) {
         return `Congrats Player ${winner}, you won`;
        } else {
         return `Next player is Player ${playerXIsNext ? 'X' : 'O'}`
        }
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]}  onClick = {() => handleClick(i)}/>
    }

    const calculateWinner = (squares) => {
        /* Squares indexes as they appear in UI:
        0 1 2
        3 4 5
        6 7 8
        */
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]; // shows all of the winning combinations ("lines")

        for(let line of lines) {
            const [a,b,c] = line
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a]
            }
        }
        return null
    }

    const winner = calculateWinner(squares);

    return (
        <>
            <main className="main--container">
                <div className="logo">
                    <img src={r2h} alt="r2h logo" />
                    <img src={fellowship} alt="fellowship" />
                </div>
                <div className="status">
                     {getStatus()} {/* calling this func */}
                </div>
                <div className="board--container">
                    <div className="board">
                        <div className="board--row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className="board--row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className="board--row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Board;