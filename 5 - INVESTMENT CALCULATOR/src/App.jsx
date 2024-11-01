import Header from "./Components/Header";
import ResultTable from "./Components/ResultTable";
import UserInput from "./Components/UserInput";
import { React, useState } from "react";

function App() {
//DATI SCELTI
  const [initialInvestment, setInitialInvestiment] = useState();
  const [annualInvestment, setAnnualInvestment] = useState();
  const [expectedReturn, setExpectedReturn] = useState();
  const [duration, setDuration] = useState();

//AGGIORNAMENTO DATI SCELTI
  function handleInitialInvestiment(chosenInitialInvestiment){
      setInitialInvestiment(Number(chosenInitialInvestiment.target.value));
  }
  
  function handleAnnualInvestment(chosenAnnualInvestment){
      setAnnualInvestment(Number(chosenAnnualInvestment.target.value));
  }
  
  function handleExpectedReturn(chosenExpectedInvestment){
    setExpectedReturn(Number(chosenExpectedInvestment.target.value));
  }
  function handleDuration(chosenDuration){
      setDuration(Number(chosenDuration.target.value));
  }

  const inputIsValid = duration >= 1;

  return (<>
    <Header/>
    <UserInput changeII={handleInitialInvestiment} changeAI={handleAnnualInvestment} changeER={handleExpectedReturn} changeD={handleDuration}/>
    {!inputIsValid && <p className="center">Please, input a duration higher than 0.</p>}
    {inputIsValid && <ResultTable initialInvestment={initialInvestment} annualInvestment={annualInvestment} expectedReturn={expectedReturn} duration={duration}/>}
    </>
  );
}

export default App
