import { useState } from "react";

export function useInput(defaultValue, validationFn){
    const [enteredValue, setEnteredValue] = useState( defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleValuesChange(event){
        setEnteredValue(event.target.value);
        setDidEdit(false);
    };

  function handleInputBlur(){
    setDidEdit(true);
  }

  return ({
    value: enteredValue,
    handleInputBlur,
    handleValuesChange,
    hasError: didEdit && !valueIsValid,
  })
}