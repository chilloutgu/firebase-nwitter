import React, { useState } from 'react';
import { dbService } from 'fbase';
import EditForm from 'components/EditForm';

function Nweet({ nweet, isCreator }) {

  /* states */
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState('');

  /* handlers */
  const onDeleteNweet = () => {
    const ok = window.confirm('Are you sure want to delete nweet?');
    if (ok) {
      /* delete */
      dbService.doc(`nweets/${nweet.id}`).delete();
    }
  }

  const onToggleEdit = () => {
    setEdit(prev => !prev);
  }

  const onChangeNewNweet = (e) => {
    setNewNweet(e.target.value);
  }

  const onSubmitNewNweet = (e) => {
    e.preventDefault();
    dbService.doc(`nweets/${nweet.id}`).update({ text: newNweet });
    setEdit(false);
  }

  return (
    <div>
      {edit && (
        <EditForm
          newNweet={newNweet}
          onChange={onChangeNewNweet}
          onSubmit={onSubmitNewNweet}
          onClickCancel={onToggleEdit}
        />
      ) || (
          <>
            <h4>{nweet.text}</h4>
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
