import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, clearNewImages } from '../../../actions/ImageActions';
import { LOADING_IMAGES, RESET_LOADING_IMAGES } from '../../../actions/types';
import { getImage } from '../../../utils/image';
import { resize, dataURItoBlob } from '../../../utils/imageResize';
import { ImageModal } from '../modals/ImageModal';
import { ImagesNav } from './ImagesNav';
import { ImageUpload } from './ImageUpload';

const ImagesForm = ({
  kitbagId,
  values,
  disabled,
  setChange,
  addArrayItem,
  error,
}) => {
  const [imageKey, setImageKey] = useState(0);
  const dispatch = useDispatch();
  const { newImages, loading, numberOfImages } = useSelector(
    (state) => state.images
  );
  const [modalIsActive, setModalIsActive] = useState(false);

  const { images } = values;

  function onFileChanged(event) {
    const { files } = event.target;
    if (!files.length) {
      return;
    }

    setChange('imagesToUpload', files.length);
    dispatch({
      type: LOADING_IMAGES,
      payload: { loading: true, numberOfImages: files.length },
    });

    for (let i = 0; i < files.length; i++) {
      resize(files[i], function (resizedDataUrl) {
        let formData = new FormData();
        formData.append('photo', dataURItoBlob(resizedDataUrl), files[i].name);
        dispatch(addImage(kitbagId, formData));
      });
    }

    return;
  }

  function renderThumbnails() {
    if (!images || !images?.length) return null;

    const thumbnails = images.map((image, index) => {
      return (
        <div key={index} className="is-flex is-flex-direction-row mb-3 ml-3">
          {image.state !== 'D' ? (
            <div className="card">
              <div className="card-image is-clickable">
                <figure className="image is-square is-96x96">
                  <img
                    src={image.imageUrl}
                    alt=""
                    role="presentation"
                    onClick={() => setImageKey(index)}
                  />
                </figure>
                {!disabled && (
                  <>
                    <div className="is-overlay-topleft">
                      <button
                        className="button is-seethru"
                        href="#"
                        onClick={deleteImage.bind(null, image._id)}
                      >
                        <i
                          aria-hidden="true"
                          className="fas fa-trash has-text-danger"
                          title="Delete this image?"
                        ></i>
                      </button>
                    </div>
                    <div className="is-overlay-topright">
                      <button
                        className="button is-seethru"
                        href="#"
                        onClick={setPrimaryImage.bind(null, image._id)}
                      >
                        <i
                          aria-hidden="true"
                          className="fas fa-star has-text-success"
                          title="Set as primary image"
                        ></i>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-image">
                <figure className="image is-square is-96x96">
                  <img src={image.imageUrl} alt="" role="presentation" />
                </figure>
                <div className="is-overlay">
                  <button
                    className="button is-seethru"
                    href="#"
                    onClick={reinstateImage.bind(null, image._id)}
                  >
                    <i
                      aria-hidden="true"
                      className="fas fa-undo has-text-warning"
                      title="Undo image deletion"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });

    if (loading) {
      // eslint-disable-next-line id-length
      for (let i = 0; i < numberOfImages; i++) {
        thumbnails.push(
          <div
            key={`loading-img-${i}`}
            className="is-flex is-flex-direction-row mb-3 ml-3"
          >
            <div className="card">
              <div className="card-image">
                <figure className="image is-96x96 has-background-grey p-3">
                  <div className="image-loader"></div>
                </figure>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="columns is-mobile is-multiline mt-3 mb-0">
        {thumbnails}
      </div>
    );
  }

  const showImage = getImage({ images, index: imageKey });

  function deleteImage(id) {
    if (id && values.images) {
      let images = values.images.map((i) => {
        if (i._id === id) {
          i.state = 'D';
        }
        return i;
      });
      setChange('images', images);
      setImageKey(0);
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
      setImageKey(0);
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
      dispatch({ type: RESET_LOADING_IMAGES });
    }
  }, [newImages, addArrayItem, setChange, values, dispatch]);

  return (
    <>
      <figure className="image mb-3 carousel">
        <img
          id="preview"
          name="preview"
          src={showImage}
          alt=""
          role="presentation"
          className="is-clickable"
          onClick={() => setModalIsActive(true)}
        />
        <ImagesNav
          images={images}
          imageKey={imageKey}
          setImageKey={setImageKey}
        />
      </figure>
      {renderThumbnails()}
      {!disabled && <ImageUpload error={error} onFileChanged={onFileChanged} />}
      <ImageModal
        images={images}
        currentKey={imageKey}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </>
  );
};

export { ImagesForm };
