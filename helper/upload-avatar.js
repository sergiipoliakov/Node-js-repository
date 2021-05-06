const multer = require('multer');
const path = require('path');
require('dotenv').config();
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, UPLOAD_DIR);
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter: (req, file, cd) => {
    if (file.mimetype.includes('image')) {
      cd(null, true);
      return;
    }
    const err = new Error('not file image downloand!');
    err.status = 400;
    cd(err);
  },
});

module.exports = upload;
