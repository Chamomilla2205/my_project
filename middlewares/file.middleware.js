const {
    constants: {
        PHOTO_MAX_SIZE,
        PHOTO_MIMETYPES,
        DOC_MAX_SIZE,
        DOC_MIMETYPES,
        VIDEO_MAX_SIZE,
        VIDEO_MIMETYPES
    },
    errorCodes
} = require('../constants');

module.exports = {
    checkUrl: async (req,res,next) => {
        try {
            const {baseUrl} = req.params;

            if (baseUrl === '/users') {
                req.obj = {photo: 10, doc: 10}
            }
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    checkFile: async (req,res,next) => {
        try {
            const {files} = req;
            const docs = [];
            const photos = [];
            const videos = [];
            const allFiles = Object.values(files);
            console.log(allFiles)
            for (let i = 0; i < allFiles.length; i++) {
                const {name, size, mimetype} = allFiles[i];

                if (PHOTO_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`)
                    }
                    photos.push(allFiles[i])
                } else if (DOC_MIMETYPES.includes(mimetype)) {
                    if (DOC_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`)
                    }
                    docs.push(allFiles[i])
                } else if (VIDEO_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`)
                    }
                    videos.push(allFiles[i])
                } else {
                    throw new Error('Not valid file')
                }
                req.docs = docs;
                req.photos = photos;
                req.videos = videos;

                next()
            }
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    checkAvatar: async (req,res,next) => {
        try {
            const {files} = req;
            // console.log(req.photos)
            for (let i = 0; i < files.length; i++) {
                const allFilesValues = Object.values(files);

                const allFilesNames = Object.keys(files);

                const {mimetype} = allFilesValues[i];

                if (PHOTO_MIMETYPES.includes(mimetype) && allFilesNames[i] === 'avatar') {
                    req.avatar = allFilesValues;
                }


                next()
            }
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
