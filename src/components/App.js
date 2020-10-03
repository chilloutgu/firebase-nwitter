import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';
import AppRouter from 'components/AppRouter';

function App() {
  /* states */
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* effects */
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setLoading(true);
        return;
      }
      setIsLoggedIn(false);
      setLoading(true);
    });
  }, []);

  /* render */
  return (
    <div className="App">
      {loading ? <AppRouter isLoggedIn={isLoggedIn} /> : 'loading...'}
    </div>
  );
}

export default App;