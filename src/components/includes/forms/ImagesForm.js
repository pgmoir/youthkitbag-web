import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, clearNewImages } from '../../../actions/ImageActions';
import { resize, dataURItoBlob } from '../../../utils/imageResize';

const ImagesForm = ({
  accountId,
  values,
  readOnly,
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
        dispatch(addImage(accountId, formData));
      });
    }
    return;
  }

  const dispatch = useDispatch();
  const newImages = useSelector((state) => state.images.newImages);

  function renderSecondaryImages() {
    if (!values || !values.images) {
      return null;
    }

    const { images } = values;
    const items = [];

    // ?? use .map
    for (let i = 0; i < images.length; i++) {
      items.push(
        <div key={`image${i}`} className="carousel-thumbnail d-inline-flex">
          {images[i].state !== 'D' && (
            <React.Fragment>
              {!readOnly && (
                <span className="icons-top-left">
                  <button
                    aria-label="Delete image"
                    className="btn btn-link p-0 icon-tray-item"
                    href="#"
                    onClick={deleteImage.bind(null, images[i]._id)}
                  >
                    <i
                      aria-hidden="true"
                      className="fas fa-trash"
                      title="Delete this image?"
                    ></i>
                  </button>
                  <button
                    aria-label="Set as primary image"
                    className="btn btn-link p-0 icon-tray-item"
                    href="#"
                    onClick={setPrimaryImage.bind(null, images[i]._id)}
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
                className="img-fluid mb-3 img-link mini-img mr-1"
                src={images[i].imageUrl}
                alt=""
                role="presentation"
                onClick={renderTopImage.bind(null, images[i].imageUrl)}
              />
            </React.Fragment>
          )}
          {images[i].state === 'D' && (
            <React.Fragment>
              <span className="icons-top-left">
                <button
                  aria-label="Undo image deletion"
                  className="btn btn-link p-0 icon-tray-item"
                  href="#"
                  onClick={reinstateImage.bind(null, images[i]._id)}
                >
                  <i
                    aria-hidden="true"
                    className="fas fa-undo"
                    title="Undo image deletion"
                  ></i>
                </button>
              </span>
              <img
                className="img-fluid mb-3 img-link mini-img mr-1"
                src={images[i].imageUrl}
                alt=""
                role="presentation"
              />
            </React.Fragment>
          )}
        </div>
      );
    }

    return <div>{items}</div>;
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
          let image = {};
          image._id = i._id;
          image.image = i.image;
          image.imageUrl = i.imageUrl;
          image.state = 'N';
          return image;
        }),
      ];
      dispatch(clearNewImages());
      addArrayItem('images', imagesToAdd);
      setChange('imagesToUpload', 0);
    }
  }, [newImages, addArrayItem, setChange, values, dispatch]);

  return (
    <React.Fragment>
      <div className="col-12 col-md-6 order-1 order-md-2" role="main">
        <div>
          <img
            id="preview"
            name="preview"
            className="img-fluid mb-3"
            src={values.topImage}
            alt=""
            role="presentation"
          />
        </div>
        <div>{renderSecondaryImages()}</div>
        {!readOnly && (
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="photos">
              Images
            </label>
            <div className="col-sm-9">
              <div className="custom-file">
                <input
                  type="file"
                  multiple
                  className={`custom-file-input${error ? ' is-invalid' : ''}`}
                  id="photos"
                  aria-describedby="photos"
                  onChange={(e) => onFileChanged(e)}
                />
                <label className="custom-file-label" htmlFor="photos">
                  Choose image(s)
                </label>
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export { ImagesForm };
