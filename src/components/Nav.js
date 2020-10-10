import React from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from 'shared/hooks';

function Nav({ user }) {
  const history = useHistory();

  /* handlers */
  const routeToHome = () => {
    history.push('/');
  };

  const routeToProfile = () => {
    history.push('/profile');
  };

  /* render */
  return (
    <nav>
      <ul>
        <li><a href="#" onClick={routeToHome}>Home</a></li>
        <li><a href="#" onClick={routeToProfile}>{user && `${user.displayName}의 `}Profile</a></li>
      </ul>
    </nav>
  );
}

export default Nav;