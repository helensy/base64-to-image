// Module dependencies.
import fs from 'fs';

interface OptionsInterface {
  fileName:string;
  type:string;
  debug?:boolean;
}

// Function + return for dinamic date
const defaultOptions = () => {
  return {
    fileName: `img-${Date.now()}`,
    type: 'png',
    debug: false,
  };
};

/**
Change base64Str to image and write image file with
the specified file name to the specified file path.
*/
const base64ToImage = (base64Str:string, path:string, optionsObj?:OptionsInterface) => {

  if (!base64Str || !path) {
    throw new Error('Missing mandatory arguments base64 string and/or path string');
  }

  const imageBuffer = decodeBase64Image(base64Str);

  const options = { ...defaultOptions(), ...optionsObj };

  const fileName = options.fileName;
  const imageType = options.type || imageBuffer.type;

  let finalFileName = fileName.toString();
  let finalImageType = imageType;

  if (finalFileName.indexOf('.') === -1) {
    finalImageType = imageType.replace('image/', '');
    finalFileName = `${finalFileName}.${finalImageType}`;
  }

  const abs = path + finalFileName;
  fs.writeFile(abs, imageBuffer.data, 'base64', (err:any) => {
    if (err && options.debug) {
      console.log('File image write error', err);
    }
  });

  return {
    fileName: finalFileName,
    imageType: finalImageType,
  };
};

const decodeBase64Image = (base64Str:string) => {
  const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  return {
    type: matches[1],
    data: Buffer.from(matches[2], 'base64'),
  };
};

export = base64ToImage;
