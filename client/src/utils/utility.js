function numberWithCommas(x) {
  return x.toString().replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,");
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

function getFileExtensionFromBlob(blob) {
  const mimeType = blob.type;
  const extensionsByMimeType = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    // Add more MIME types and extensions as needed
  };
  
  return extensionsByMimeType[mimeType] || null;
}

export {
    numberWithCommas,
    dataURItoBlob,
    getFileExtensionFromBlob
}