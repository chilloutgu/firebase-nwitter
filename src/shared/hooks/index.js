import { useState } from 'react';

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = e => {
    setValue(e.target.value);
  }

  return [value, onChangeValue, setValue];
}