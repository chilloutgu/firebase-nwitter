import React from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

function ProfilePage() {
  const history = useHistory();

  const onClickLogout = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <>
      <button onClick={onClickLogout}>log out</button>
    </>
  );
}

export default ProfilePage;