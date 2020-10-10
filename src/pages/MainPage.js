import React, { useState, useEffect, Fragment } from 'react';
import { dbService } from 'fbase';
import NweetForm from 'components/NweetForm';
import Nweet from 'components/Nweet';

function MainPage({ user }) {
  /* states */
  const [nweets, setNweets] = useState([]);

  /* effects */
  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapshot => {
      const nweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <NweetForm user={user} />
      <div>
        {nweets.map(nweet => (
          <Fragment key={nweet.id}>
            <Nweet nweet={nweet} isCreator={nweet.creatorId === user.uid} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default MainPage;