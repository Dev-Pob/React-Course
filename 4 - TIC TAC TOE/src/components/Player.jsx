import { useState } from "react";

export default function Player({initialName,  symbol , isActive, onChangeName}){
const [playerNameState, setPlayerNameState] = useState(initialName)
const [isEditing, setIsEditing] = useState(false);

function handleClick(){
    setIsEditing((editing) => !editing);
    if(isEditing){
        onChangeName(symbol,playerNameState);
    };
}

function handleChange(chosenName){
    setPlayerNameState(chosenName.target.value);
}

let playerName = <span className="player-name">{playerNameState}</span>;
let btnCaption = "Edit";

//Si usa If come stato e non { ? : null} perchè il cambio di stato condiziona più variabili e sarebbe inutile scrivere più volte lo stesso codice condizionael

if(isEditing){
    playerName = <input type="text" required value={playerNameState} onChange={handleChange} />;
    btnCaption = "Save";
}

    return(
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{btnCaption}</button>
    </li>);
}