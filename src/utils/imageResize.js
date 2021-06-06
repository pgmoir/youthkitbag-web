export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  let uint8array = new Uint8Array(arrayBuffer);
  for (var i = 0; i < byteString.length; i++) {
    uint8array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mimeString });
  return blob;
};

export const resize = (file, fn) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    const dataUrl = event.target.result;
    let image = new Image();
    image.src = dataUrl;
    image.onload = function () {
      let resizedDataUrl = resizeImage(image);
      fn(resizedDataUrl);
    };
  };
};

function resizeImage(image) {
  const canvas = document.createElement('canvas');

  const { height, width } = image;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  context.ImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.mozImageSmoothingEnabled = false;

  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', 0.23);
}
