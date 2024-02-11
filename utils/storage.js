const { GridFsStorage } = require("multer-gridfs-storage");
const { connection } = require("./dbConnection");

const storage = new GridFsStorage({
  db: connection,
  file: (req, file) => {
    return {
      bucketName: "assets",
      filename: file.originalname,
    };
  },
});

module.exports = storage;
