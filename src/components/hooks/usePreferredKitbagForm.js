import { useState, useEffect } from 'react';

const usePreferredKitbagForm = (initiaValues, callback) => {
  const [values, setValues] = useState(initiaValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [callback, isSubmitting]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
  };

  const setPreferred = (event) => {
    event.persist();
    const { id } = event.target;
    const newValues = values.map((a) => {
      return {
        _id: a._id,
        preferred: id === a._id ? true : false,
        name: a.name,
        members: a.members,
      };
    });
    setValues(newValues);
  };

  return {
    setPreferred,
    handleSubmit,
    values,
    setValues,
  };
};

export default usePreferredKitbagForm;
