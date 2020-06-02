export const getImages = images => {
  if (!images) return null;

  return images.map(i => {
    var ni = { ...i };
    ni.state = '';
    ni.photoId = '';
    return ni;
  });
};
