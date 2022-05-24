import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    changeHandler: (e) => {
      setValue(e.target.value);
    },
  };
};

export default useInput;