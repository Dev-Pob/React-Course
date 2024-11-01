export default function GameOver({winner, onSelect}){
    return <div id="game-over">
        <h2>GAME OVER!</h2>
        {winner && <p>{winner} WON!</p>}
        {!winner && <p>IT'S A DRAW!</p>}
        <button onClick={onSelect}>Play again!</button>
    </div>
}