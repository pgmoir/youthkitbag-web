import React from 'react';

const AddArrayButtonForm = ({ label, onClick }) => {
  return (
    <>
      <button className="btn btn-secondary" type="button" onClick={onClick}>
        {label}
      </button>
    </>
  );
};

export { AddArrayButtonForm };
