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
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (newProfile) => user.updateProfile(newProfile)
        });
        return;
      }

      /* login failure */
      setIsLoggedIn(false);
      setLoading(true);
    });

  }, []);

  /* functions */
  const refreshUser = () => {
    const currentUser = authService.currentUser;
    setUser({
      id: currentUser.uid,
      displayName: currentUser.displayName,
      updateProfile: (newProfile) => currentUser.updateProfile(newProfile)
    });
  }

  /* render */
  return (
    <div className="App">
      {loading ? <AppRouter isLoggedIn={isLoggedIn} user={user} refreshUser={refreshUser} /> : 'loading...'}
    </div>
  );
}

export default App;