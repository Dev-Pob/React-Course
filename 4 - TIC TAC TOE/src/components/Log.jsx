export default function Log({gameState}){
    return  <ol id="log">
         {gameState.map((turn) => 
         <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player} selected {turn.square.row},{turn.square.col}
        </li>)}
    </ol>; 
}