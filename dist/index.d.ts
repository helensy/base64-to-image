interface OptionsInterface {
    fileName: string;
    type: string;
    debug?: boolean;
}
/**
Change base64Str to image and write image file with
the specified file name to the specified file path.
*/
declare const base64ToImage: (base64Str: string, filePath: string, optionsObj?: OptionsInterface | undefined) => {
    fileName: string;
    imageType: string;
};
export = base64ToImage;
