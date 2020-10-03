import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbase';

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newAccount) {
        const userData = await authService.createUserWithEmailAndPassword(email, password);
        console.log(userData);
        return;
      }
      const userData = await authService.signInWithEmailAndPassword(email, password);
      console.log(userData);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const onToggleAccountState = () => {
    setNewAccount(prev => setNewAccount(!prev));
  }

  const onClickGoogle = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  }

  const onClickGithub = async () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    await authService.signInWithPopup(provider);
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} placeholder="email" required onChange={onChangeEmail} />
        <input type="password" name="password" value={password} placeholder="password" required onChange={onChangePassword} />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        {errorMessage}
      </form>
      <div>
        <span onClick={onToggleAccountState}>{newAccount ? "Create Account" : "Sign In"}</span>
        <button name="google" onClick={onClickGoogle}>Continue with Google</button>
        <button name="github" onClick={onClickGithub}>Continue with Github</button>
      </div>
    </div>
  );
}

export default Auth;