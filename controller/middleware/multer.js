const multer = require("multer");
const storage = require("../../utils/storage");

const multerFilter = (req, file, cb) => {
  console.log(file);
  cb();
};

const multerConfig = {
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 20 },
};

const upload = multer(multerConfig);

module.exports = upload;
