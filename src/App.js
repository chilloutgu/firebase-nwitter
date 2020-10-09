import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';
import AppRouter from 'components/AppRouter';

function App() {
  /* states */
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  /* effects */
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      /* login success */
      if (user) {
        setIsLoggedIn(true);
        setLoading(true);
        setUser(user);
        return;
      }

      /* login failure */
      setIsLoggedIn(false);
      setLoading(false);
    });

  }, []);

  /* render */
  return (
    <div className="App">
      {loading ? <AppRouter isLoggedIn={isLoggedIn} user={user} /> : 'loading...'}
    </div>
  );
}

export default App;