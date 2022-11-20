const fs = require('fs');
const { path } = require('../util/enums');

class StorageService {
  static writeFile(file, meta, id) {
    if (!fs.existsSync(path.ALBUM_COVER)) {
      fs.mkdirSync(path.ALBUM_COVER, { recursive: true });
    }
    const ext = meta.filename.substring(
      meta.filename.lastIndexOf('.') + 1,
      meta.filename.length
    );
    const filename = `${id}-${+new Date()}.${ext}`;
    const pathToSave = `${path.ALBUM_COVER}/${filename}`;

    const fileStream = fs.createWriteStream(pathToSave);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
