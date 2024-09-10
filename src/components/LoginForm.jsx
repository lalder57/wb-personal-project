import { useState } from "react";



const LoginForm = ({onLogin}) => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        onLogin(e, {
          username: usernameValue,
          password: passwordValue,
        });
      }}
      >
        Login Form

      <label htmlFor="username">Username:</label>
      <input 
      username='username'
      type='text'
      required
      onChange={(e) => setUsernameValue(e.target.value)}
      />
      <label htmlFor="passwrd">Password:</label>
      <input 
      username='password'
      type='text'
      required
      onChange={(e) => setPasswordValue(e.target.value)}
      />

      <button type='submit'>Login</button>

    </form>
  )
}

export default LoginForm
