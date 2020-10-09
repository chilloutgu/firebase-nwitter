import React from 'react';
import { useHistory } from 'react-router-dom';

function Nav() {
  const history = useHistory();

  const routeToHome = () => {
    history.push('/');
  };

  const routeToProfile = () => {
    history.push('/profile');
  };

  return (
    <nav>
      <ul>
        <li><a href="#" onClick={routeToHome}>Home</a></li>
        <li><a href="#" onClick={routeToProfile}>Profile</a></li>
      </ul>
    </nav>
  );
}

export default Nav;