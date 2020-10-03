import React from 'react';

function NweetInput({ nweet, onChange }) {
  return (
    <input type="text" value={nweet} onChange={onChange} placeholder="what's on your mind?" maxLength={140} />
  );
}

export default React.memo(NweetInput);