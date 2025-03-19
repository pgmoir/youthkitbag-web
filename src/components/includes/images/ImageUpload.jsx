import React from 'react';

const ImageUpload = ({ error, onFileChanged }) => {
  return (
    <div className="field mb-3">
      <div className="control">
        <div className="file">
          <label className="file-label" htmlFor="photos">
            <input
              type="file"
              multiple
              className={`file-input${error ? ' is-danger' : ''}`}
              id="photos"
              aria-describedby="photos"
              onChange={(e) => onFileChanged(e)}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Choose image(s)</span>
            </span>
          </label>
        </div>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export { ImageUpload };
