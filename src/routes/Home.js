import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';

function Home({ user }) {
  /* states */
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  /* effects */
  useEffect(() => {
    async function getNweets() {
      const nweets = await dbService.collection('nweets').get();
      nweets.forEach(document => {
        const nweetObject = {
          id: document.id,
          ...document.data()
        };
        setNweets(prev => [nweetObject, ...prev]);
      });
    }
    //
    // getNweets();
    dbService.collection('nweets').onSnapshot(snapShot => {
      const nweetsArr = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNweets(nweetsArr);
    })
  }, []);

  const onChangeNweet = (e) => {
    setNweet(e.target.value);
  }

  console.log(nweets);

  const onSubmitNweet = async (e) => {
    e.preventDefault();

    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: user.uid
    });

    setNweet('');
  }

  return (
    <div>
      <form onSubmit={onSubmitNweet}>
        <input type="text" value={nweet} onChange={onChangeNweet} placeholder="what's on your mind?" maxLength={140} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => (
          <div key={nweet.id}>
            <h3>{nweet.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;