const multer = require("multer");
const storage = require("../utils/storage");
const HttpError = require("../utils/HttpError");

const multerFilter = (req, file, cb) => {
  if (
    !["image/jpeg", "image/png", "image/bmp", "image/gif"].includes(
      file.mimetype
    )
  ) {
    cb(
      new HttpError(
        400,
        "Invalid file type. Only jpeg, png, bmp and gif files are supported."
      )
    );
  }
  cb(null, true);
};

const multerConfig = {
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 20 },
};

const upload = multer(multerConfig);

module.exports = upload;
