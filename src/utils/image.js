import md5 from 'md5';
import { ImageUrls } from '../enums/imageUrls.enum';

export const getImages = (images) => {
  if (!images) return null;

  return images.map((i) => {
    var ni = { ...i };
    ni.state = '';
    ni.photoId = '';
    return ni;
  });
};

export const getImage = ({ images, email, index = 0 }) => {
  if (!images || images.length === 0 || !images[index]) {
    if (!email) {
      return ImageUrls.DEFAULT;
    }

    const hash = md5(email);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  }
  return !images[index].imageUrl ? images[index] : images[index].imageUrl;
};

export const getFirstImageExcludeDeleted = ({ images, email }) => {
  const availableImages = images?.filter((i) => i.state !== 'D');
  return getImage({ images: availableImages, email });
};
