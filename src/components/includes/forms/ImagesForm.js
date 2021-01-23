import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, clearNewImages } from '../../../actions/ImageActions';
import { resize, dataURItoBlob } from '../../../utils/imageResize';

const ImagesForm = ({
  kitbagId,
  values,
  disabled,
  setChange,
  addArrayItem,
  error,
}) => {
  const MAXWIDTH = 720;
  const MAXHEIGHT = 720;

  function onFileChanged(event) {
    const { files } = event.target;
    if (!files.length) {
      return;
    }
    setChange('imagesToUpload', files.length);
    for (let i = 0; i < files.length; i++) {
      resize(files[i], MAXWIDTH, MAXHEIGHT, function (resizedDataUrl) {
        let formData = new FormData();
        formData.append('photo', dataURItoBlob(resizedDataUrl), files[i].name);
        dispatch(addImage(kitbagId, formData));
      });
    }
    return;
  }

  const dispatch = useDispatch();
  const newImages = useSelector((state) => state.images.newImages);

  function renderThumbnails() {
    if (!values || !values.images) {
      return null;
    }

    const { images } = values;
    const items = [];

    return images.map((image, index) => {
      return (
        <div key={index} className="is-flex is-flex-direction-row m-3">
          {image.state !== 'D' ? (
            <figure className="image is-128x128">
              {!disabled && (
                <span className="is-overlay">
                  <button
                    className="button"
                    href="#"
                    onClick={deleteImage.bind(null, image._id)}
                  >
                    <i
                      aria-hidden="true"
                      className="fas fa-trash"
                      title="Delete this image?"
                    ></i>
                  </button>
                  <button
                    className="button"
                    href="#"
                    onClick={setPrimaryImage.bind(null, image._id)}
                  >
                    <i
                      aria-hidden="true"
                      className="fas fa-star"
                      title="Set as primary image"
                    ></i>
                  </button>
                </span>
              )}
              <img
                src={image.imageUrl}
                alt=""
                role="presentation"
                onClick={renderTopImage.bind(null, image.imageUrl)}
              />
            </figure>
          ) : (
            <figure className="image is-128x128">
              <span className="is-overlay">
                <button
                  className="button"
                  href="#"
                  onClick={reinstateImage.bind(null, image._id)}
                >
                  <i
                    aria-hidden="true"
                    className="fas fa-undo"
                    title="Undo image deletion"
                  ></i>
                </button>
              </span>
              <img src={image.imageUrl} alt="" role="presentation" />
            </figure>
          )}
        </div>
      );
    });
  }

  function renderTopImage(src) {
    setChange('topImage', src);
  }

  function deleteImage(id) {
    if (id && values.images) {
      let images = values.images.map((i) => {
        if (i._id === id) {
          i.state = 'D';
        }
        return i;
      });
      setChange('images', images);
      setChange(
        'topImage',
        images && images.filter((i) => i.state !== 'D').length > 0
          ? images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png'
      );
    }
  }

  function reinstateImage(id) {
    if (id && values.images) {
      let images = values.images.map((i) => {
        if (i._id === id) {
          i.state = 'N';
        }
        return i;
      });
      setChange('images', images);
    }
  }

  function setPrimaryImage(id) {
    if (id && values.images) {
      const primaryImage = values.images.filter((i) => i._id === id);
      const otherImages = values.images.filter((i) => i._id !== id);
      const images = primaryImage.concat(otherImages);
      setChange('images', images);
      setChange(
        'topImage',
        images && images.filter((i) => i.state !== 'D').length > 0
          ? images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png'
      );
    }
  }

  useEffect(() => {
    if (
      newImages &&
      newImages.length > 0 &&
      newImages.length === values.imagesToUpload
    ) {
      const imagesToAdd = [
        ...newImages.map((i) => {
          let image = {
            photo: i._id,
            imageUrl: i.imageUrl,
            state: 'N',
          };

          return image;
        }),
      ];
      dispatch(clearNewImages());
      addArrayItem('images', imagesToAdd);
      setChange('imagesToUpload', 0);
    }
  }, [newImages, addArrayItem, setChange, values, dispatch]);

  return (
    <div className="" role="main">
      <figure class="image mb-3">
        <img
          id="preview"
          name="preview"
          src={values.topImage}
          alt=""
          role="presentation"
        />
      </figure>
      <div className="columns is-multiline mb-0">{renderThumbnails()}</div>
      {!disabled && (
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
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose image(s)</span>
                </span>
              </label>
            </div>
          </div>
          {error && <p className="help is-danger">{error}</p>}
        </div>
      )}
    </div>
  );
};

export { ImagesForm };
