import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import EditForm from 'components/EditForm';

function Nweet({ nweet, isCreator }) {

  /* states */
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState('');

  /* handlers */
  const onToggleEdit = () => {
    setEdit(prev => !prev);
  };

  const onDeleteNweet = () => {
    const yes = window.confirm('Are you sure to delete this nweet?');
    if (yes) {
      dbService.doc(`nweets/${nweet.id}`).delete();
      storageService.refFromURL(nweet.downloadUrl).delete();
    }
  }

  const onChangeNewNweet = (e) => {
    setNewNweet(e.target.value);
  }

  const onUpdateNweet = (e) => {
    e.preventDefault();
    dbService.doc(`nweets/${nweet.id}`).update({ text: newNweet });
    setEdit(false);
  }

  return (
    <div>
      {edit && (
        <>
          <EditForm
            newNweet={newNweet}
            onChange={onChangeNewNweet}
            onSubmit={onUpdateNweet}
            onClickCancel={onToggleEdit}
          />
        </>
      ) || (
          <>
            <h4>{nweet.text}</h4>
            {nweet.downloadUrl && <img src={nweet.downloadUrl} width="120px" height="80px" />}
            {isCreator && (
              <>
                <button onClick={onDeleteNweet}>Delete Nweet</button>
                <button onClick={onToggleEdit}>Edit Nweet</button>
              </>
            )
            }
          </>
        )}
    </div>
  );
}

export default React.memo(Nweet);
