import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbase';
import { useInput } from 'shared/hooks';

function LoginPage() {

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await authService.createUserWithEmailAndPassword(email, password);
        return;
      }
      await authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const toggleSignUpOrSignIn = () => {
    setIsSignUp(prev => !prev);
  }

  const onSocialLogin = async (e) => {
    const socialName = e.target.name;
    let provider;

    if (socialName === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    if (socialName === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} placeholder="email" required onChange={onChangeEmail} />
        <input type="password" name="password" value={password} placeholder="password" required onChange={onChangePassword} />
        <input type="submit" value={isSignUp ? "Sign up" : "Sign in"} />
        {errorMessage}
      </form>
      <div>
        <span onClick={toggleSignUpOrSignIn}>{isSignUp ? "Sign up" : "Sign in"}</span>
        <button name="google" onClick={onSocialLogin}>Continue with Google</button>
        <button name="github" onClick={onSocialLogin}>Continue with Github</button>
      </div>
    </div>
  );
}

export default LoginPage;