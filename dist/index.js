"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Module dependencies.
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// Function + return for dinamic date
var defaultOptions = function () {
    return {
        fileName: "img-" + Date.now(),
        type: 'png',
        debug: false,
    };
};
/**
Change base64Str to image and write image file with
the specified file name to the specified file path.
*/
var base64ToImage = function (base64Str, filePath, optionsObj) {
    if (!base64Str || !filePath) {
        throw new Error('Missing mandatory arguments base64 string and/or path string');
    }
    var imageBuffer = decodeBase64Image(base64Str);
    var options = __assign({}, defaultOptions(), optionsObj);
    var fileName = options.fileName;
    var imageType = options.type || imageBuffer.type;
    var finalFileName = fileName.toString();
    var finalImageType = imageType;
    if (finalFileName.indexOf('.') === -1) {
        finalImageType = imageType.replace('image/', '');
        finalFileName = finalFileName + "." + finalImageType;
    }
    var abs = path_1.default.join(filePath, finalFileName);
    fs_1.default.writeFile(abs, imageBuffer.data, 'base64', function (err) {
        if (err && options.debug) {
            console.error('File image write error', err);
        }
    });
    return {
        fileName: finalFileName,
        imageType: finalImageType,
    };
};
var decodeBase64Image = function (base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }
    return {
        type: matches[1],
        data: Buffer.from(matches[2], 'base64'),
    };
};
module.exports = base64ToImage;
