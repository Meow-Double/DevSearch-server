import multer from 'multer';
import uuid4 from 'uuid4';
import fs from 'fs';
import path from 'path';

const uploadDir = 'uploads/users';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const avatar_name = uuid4() + path.extname(file.originalname);
    cb(null, avatar_name);
  },
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  console.log(types.includes(file.mimetype));
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage }, fileFilter);
