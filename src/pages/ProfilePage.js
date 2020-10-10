import React, { useState, useEffect } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';
import ProfileForm from 'components/ProfileForm';
import Nweet from 'components/Nweet';


function ProfilePage({ user, refreshUser }) {
  const history = useHistory();

  /* states */
  const [myNweets, setMyNweets] = useState([]);

  /* effects */
  useEffect(function () {
    fetchMyNweets();
  }, []);

  /* functions */
  const fetchMyNweets = async () => {
    if (user) {
      const response = await dbService.collection('nweets')
        .where('creatorId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();
      const myNweets = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setMyNweets(myNweets);
    }
  };

  /* handlers */
  const onClickLogout = () => {
    authService.signOut();
    history.push('/');
  };

  /* render */
  return (
    <>
      <ProfileForm user={user} refreshUser={refreshUser} />
      <button onClick={onClickLogout}>log out</button>
      {myNweets.map((myNweet) => (
        <Nweet
          key={myNweet.id}
          nweet={myNweet}
          isCreator
        />
      ))}
    </>
  );
}

export default ProfilePage;