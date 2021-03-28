const multer = require("multer");

const stroage = multer.diskStorage({
  destination: (req, flle, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: stroage });
module.exports = upload;
