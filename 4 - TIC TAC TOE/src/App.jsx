import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X : "Player 1",
  O : "Player 2",
};

//BOARD DI PARTENZA
const initalGameBoard=[
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// CHECK ON CURRENT PLAYER
function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player=== 'X'){
      currentPlayer = 'O';
    }
   
  return currentPlayer  ;
}

function App() {
const [gameTurns, setGameTurns] = useState([])
const [player, setPlayer] = useState(PLAYERS);

//AGGIORNAMENTO STATO PLAYER ATTIVO
// const [activePlayer, setActivePlayer] = useState('X') SCARTATO
const activePlayer = deriveActivePlayer(gameTurns);

//AGGIORNAMENTO DI STATO SUL SELECT SQUARE
function handleSelectSquare(rowIndex,colIndex){
  // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X'); SCARTATO
  setGameTurns((prevTurns) => {
    const currentPlayer = deriveActivePlayer(prevTurns);
    const updatedTurns = [
      {square:{ row: rowIndex , col: colIndex}, player: currentPlayer},
      ...prevTurns,];

      return updatedTurns;
  });
}

// GAMEBOARD
function deriveGameBoard(gameTurns){
  let gameBoard = [...initalGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
      const {square , player } = turn;
      const {row, col} = square;
  
      gameBoard[row][col]=player;
  }
  return gameBoard;
}


//CHANGE NAME
function handlePlayerNameChange(symbol, newName){
  setPlayer((prevPlayer) => {
    return {
      ...prevPlayer,
      [symbol] : newName,
    };
  });
}

//WIN CONDITION
function winConditionCheck(gameBoard, player){
  let winner=null;

  for ( const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol];
    }
  };
  return winner;
}


//GAME RESET
function resetGame(){
  setGameTurns([]);
}

//DRAW or WIN
const gameBoard = deriveGameBoard(gameTurns);
const winner = winConditionCheck(gameBoard, player);
const hasDraw = (gameTurns.length === 9 && !winner);


//MAIN
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol="X"></Player>
        <Player isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol="O"></Player>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onSelect={resetGame}/>}
      <GameBoard board={gameBoard} turns={gameTurns} onSelectSquare={handleSelectSquare}/>
    </div>
    <Log gameState={gameTurns}/>
  </main>

}

export default App
