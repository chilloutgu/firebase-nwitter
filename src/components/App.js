import React from 'react';
import firebase from '../firebase';
import AppRouter from './AppRouter';

function App() {
  console.log(firebase);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;