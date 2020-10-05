import React, { useState, useCallback } from 'react';
import NweetInput from './NweetInput';
import { dbService } from 'fbase';

function NweetForm({ user }) {
  /* states */
  const [nweet, setNweet] = useState('');
  const [thumnail, setThumnail] = useState('');

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

  const onChangeFile = (event) => {
    const files = event.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = finishEvent => {
      console.log(finishEvent.target.result);
      setThumnail(finishEvent.target.result);
    }

    reader.readAsDataURL(file);
  }

  const onClearImage = () => {
    setThumnail('');
  }

  /* render */
  return (
    <>
      <form onSubmit={onSubmitNweet}>
        <NweetInput nweet={nweet} onChange={onChangeNweet} />
        <input type="file" accpet="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
      </form>
      {thumnail && (
        <div>
          <img src={thumnail} alt="thumnail" width="50px" height="50px" />
          <button onClick={onClearImage}>clear</button>
        </div>
      )}
    </>
  );



}

export default React.memo(NweetForm);