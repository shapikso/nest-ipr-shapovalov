import { extname } from "path";

class FilenameGenerator {
    basePath;

    constructor (basePath) {
        this.basePath = basePath;
    }

    getUniqueFilename (filename) {
        const extension = extname(filename);
        const baseFilename = filename.replace(extension, '').replaceAll(' ','-');
        return `${baseFilename}${extension}`
    }
}

export default FilenameGenerator;
