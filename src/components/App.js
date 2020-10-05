import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';
import AppRouter from 'components/AppRouter';

function App() {
  /* states */
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  /* effects */
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setLoading(true);
        setUser(user);
        return;
      }
      setIsLoggedIn(false);
      setLoading(true);
    });
  }, []);

  console.log('hello!');
  /* render */
  return (
    <div className="App">
      {loading ? <AppRouter isLoggedIn={isLoggedIn} user={user} /> : 'loading...'}
    </div>
  );
}

export default App;