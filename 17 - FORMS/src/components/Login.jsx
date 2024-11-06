import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js'
import Input from "./Input";
import { useInput } from "../Hooks/useInput";

export default function Login() {
  const {
    value: emailValue , 
    handleInputBlur: handleEmailBlur,
    handleValuesChange: handleEmailChange,
    hasError: emailHasError,
  } = useInput('', (value)=> isEmail(value) && isNotEmpty(value))

  const {
    value: passwordValue , 
    handleInputBlur: handlePasswordBlur, 
    handleValuesChange: handlePasswordChange,
    hasError : passwordHasError,
  } = useInput('', (value)=> hasMinLength(value, 6))

  function handleSubmit(event){
    event.preventDefault();

    if(emailHasError || passwordHasError){
      return;
    }
    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
              <h2>Login</h2>
      <div className="control-row">

          <div>
            <Input
              label={'Email'} 
              id="email" 
              type="email" 
              name="email" 
              onBlur={handleEmailBlur} 
              onChange={handleEmailChange} 
              value={emailValue}
              error={emailHasError && 'Please enter a valid email.'}
            />
        </div>

        <Input
          label={'password'} 
          id="password" 
          type="password" 
          name="password" 
          onBlur={handlePasswordBlur} 
          onChange={handlePasswordChange} 
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onClick={handleSubmit}>Login</button>
      </p>
    </form>
  );
}
