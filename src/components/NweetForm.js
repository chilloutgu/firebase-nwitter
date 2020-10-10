import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NweetInput from './NweetInput';
import { dbService, storageService } from 'fbase';
import { useInput } from 'shared/hooks';

function NweetForm({ user }) {
  /* states */
  const [nweet, onChangeNweet, setNweet] = useInput('');
  const [thumbnail, setThumbnail] = useState('');

  /* handlers */
  const createNweet = async (e) => {
    e.preventDefault();
    let downloadUrl = '';
    if (thumbnail) {
      const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
      const response = await fileRef.putString(thumbnail, 'data_url');
      downloadUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: user.uid,
      downloadUrl
    }

    await dbService.collection('nweets').add(nweetObj);

    setNweet('');
    setThumbnail('');
  }

  const onChangeFile = (e) => {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = finishEvent => {
      console.log(finishEvent.target.result);
      setThumbnail(finishEvent.target.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const onClearThumbnail = () => {
    setThumbnail('');
  }

  /* render */
  return (
    <>
      <form onSubmit={createNweet}>
        <NweetInput nweet={nweet} onChange={onChangeNweet} />
        <input type="file" accpet="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
      </form>
      {thumbnail && (
        <div>
          <img src={thumbnail} alt="thumbnail" width="120px" height="80px" />
          <button onClick={onClearThumbnail}>clear</button>
        </div>
      )}
    </>
  );



}

export default React.memo(NweetForm);