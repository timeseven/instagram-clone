export const convertImgToBase64 = (url: string, ext: string, callback: Function) => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  img.onload = function () {
    canvas.width = 64;
    canvas.height = 64;
    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    let dataURL = canvas.toDataURL("image/" + ext || "jpeg");
    callback.call(this, dataURL);
    canvas = null!;
  };
};
