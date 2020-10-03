import React, { useState, useEffect, useCallback } from 'react';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';
import NweetForm from 'components/NweetForm';

function Home({ user }) {
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

  const onUpdateNweet = useCallback(() => {

  }, []);

  const onDeleteNweet = useCallback(() => {

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
            onUpdate={onUpdateNweet}
            onDelete={onDeleteNweet}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;