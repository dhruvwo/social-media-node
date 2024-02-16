const multer = require("multer");
const storage = require("../utils/storage");

const multerFilter = (req, file, cb) => {
  if (
    !["image/jpeg", "image/png", "image/bmp", "image/gif"].includes(
      file.mimetype
    )
  ) {
    cb("Invalid file type. Only jpeg, png, bmp and gif files are supported.");
  }
  cb(null, true);
};

const multerConfig = {
  fileFilter: multerFilter,
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 },
};

const upload = multer(multerConfig);

module.exports = upload;
