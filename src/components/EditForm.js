import React from 'react';

function EditForm({ newNweet, onChange, onSubmit, onClickCancel }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={newNweet} onChange={onChange} placeholder="edit your nweet!" required />
        <input type="submit" value="edit" />
      </form>
      <button onClick={onClickCancel}>Cancel</button>
    </>
  );
}

export default EditForm;