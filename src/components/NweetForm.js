import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NweetInput from './NweetInput';
import { dbService, storageService } from 'fbase';

function NweetForm({ user }) {
  /* states */
  const [nweet, setNweet] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  /* handlers */
  const onChangeNweet = useCallback((e) => {
    setNweet(e.target.value);
  }, [nweet]);

  const onSubmitNweet = async (e) => {
    e.preventDefault();
    const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
    const response = await fileRef.putString(thumbnail, "data_url");
    console.log('response:', response);

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
      setThumbnail(finishEvent.target.result);
    }

    reader.readAsDataURL(file);
  }

  const onClearImage = () => {
    setThumbnail('');
  }

  /* render */
  return (
    <>
      <form onSubmit={onSubmitNweet}>
        <NweetInput nweet={nweet} onChange={onChangeNweet} />
        <input type="file" accpet="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
      </form>
      {thumbnail && (
        <div>
          <img src={thumbnail} alt="thumbnail" width="50px" height="50px" />
          <button onClick={onClearImage}>clear</button>
        </div>
      )}
    </>
  );



}

export default React.memo(NweetForm);