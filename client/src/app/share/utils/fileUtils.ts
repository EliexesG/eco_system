export function dataURItoBlob(dataURI) {
  var fileName = dataURI
    .split(',')[0]
    .split(';')[0]
    .split(':')[1]
    .replace('image/', '.')
    .toLowerCase();
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ia], fileName, { type: fileName });
}

export function createFileName(
  elementName: string,
  fileName: string,
  type: string
) {
  let split: string[] = fileName.split('.');

  let extension: string = split[split.length - 1];

  return `${type}_${elementName}.${extension}`.toLowerCase();
}
