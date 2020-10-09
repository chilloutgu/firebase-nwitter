import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';
import NweetForm from 'components/NweetForm';

function MainPage({ user }) {
  /* states */
  const [nweets, setNweets] = useState([]);

  /* effects */
  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapShot => {
      const nweetsArr = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNweets(nweetsArr);
    })
  }, []);


  return (
    <div>
      <NweetForm user={user} />
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweet={nweet}
            isOwner={nweet.creatorId === user.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default MainPage;