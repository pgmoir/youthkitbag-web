import React from 'react';

const ArrayButtonAdd = ({ label, onClick }) => {
  return (
    <div className="buttons">
      <button className="button is-info" type="button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default ArrayButtonAdd;
