import React, { useState, useCallback } from 'react';
import NweetInput from './NweetInput';
import { dbService } from 'fbase';

function NweetForm({ user }) {
  /* states */
  const [nweet, setNweet] = useState('');

  /* handlers */
  const onChangeNweet = useCallback((e) => {
    setNweet(e.target.value);
  }, [nweet]);

  const onSubmitNweet = async (e) => {
    e.preventDefault();

    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: user.uid
    });

    setNweet('');
  }

  /* render */
  return (
    <form onSubmit={onSubmitNweet}>
      <NweetInput nweet={nweet} onChange={onChangeNweet} />
      <input type="submit" value="Nweet" />
    </form>
  );



}

export default React.memo(NweetForm);