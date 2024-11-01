export default function UserInput({changeII, changeAI, changeER, changeD}){
    return(
        <div id="user-input" >
            <div className="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input type="number" required onChange={changeII}/>
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input type="number" required onChange={changeAI}/>         
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label>Expected Return</label>
                    <input type="number" required onChange={changeER}/>
                </p>
                <p>
                    <label>Duration</label>
                    <input type="number" required onChange={changeD}/>
                </p>
            </div>
        </div>
    );
}