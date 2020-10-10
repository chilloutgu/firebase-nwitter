import React from 'react';
import { useInput } from 'shared/hooks';

function ProfileForm({ user, refreshUser }) {
  /* states */
  const [profileName, onChangeProfileName] = useInput('');

  /* handlers */
  const updateProfileName = async (e) => {
    e.preventDefault();
    if (user && user.displayName !== profileName) {
      await user.updateProfile({ displayName: profileName });
      refreshUser();
    }
  }

  return (
    <form onSubmit={updateProfileName}>
      <input value={profileName} onChange={onChangeProfileName} placeholder="update your profile name!" required />
      <input type="submit" value="update" />
    </form>
  );
}

export default ProfileForm;
