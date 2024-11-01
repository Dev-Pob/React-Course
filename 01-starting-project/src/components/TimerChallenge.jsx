import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title , targetTime}){
    // * In questo modo non ci è possibile calcolare quanto tempo rimane*
    // const [timerStarted, setTimerStarted] = useState(false)
    // const [timerExpired, setTimerExprired] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState( targetTime * 1000)
    
    const timer = useRef();
    const dialog = useRef();
    
    // * In questo modo non ci è possibile calcolare quanto tempo rimane*
    // function handleStart(){
    //     setTimerStarted(true);
    //     timer.current = setTimeout(()=> {
    //         setTimerExprired(true);
    //         dialog.current.open();
    //     }, targetTime * 1000);
    // }

    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    function handleStart(){
        timer.current = setInterval(()=> {
            setTimeRemaining(prevTimeRemaming => prevTimeRemaming - 10);
        }, 10 /*questo non è il tempo dell'intervallo ma l'intervallo secondo cui avviene il check di stato*/);
    }

    if(timeRemaining <=0){
        clearInterval(timer.current);
        dialog.current.open();
    }


    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    return(
    <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingState={timeRemaining} onReset={handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime >1 ? 's' : null}
            </p>
            <p>
                <button onClick={timeIsActive ? handleStop : handleStart}>
                    {timeIsActive ? 'Stop' : 'Start'} Challenge!
                </button>
            </p>
            <p className={timeIsActive ? 'Active' : undefined}>
            {timeIsActive ? 'Time is running' : 'Timer is inactive'}
            </p>
        </section>
    </>
    );
}