import React from 'react';

function Nweet({ nweet, isOwner, onUpdate, onDelete }) {

  return (
    <div>
      <h4>{nweet.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDelete}>Delete Nweet</button>
          <button onClick={onUpdate}>Edit Nweet</button>
        </>
      )
      }
    </div>
  );
}

export default React.memo(Nweet);