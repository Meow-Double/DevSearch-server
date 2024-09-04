import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import UserModel from '../models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const UploadController = new (class UserController {
  async upload(req, res) {
    try {
      if (req.file) {
        const userId = req.userId;

        const userData = await UserModel.findById(userId);

        console.log(userData._doc);
        const avatarPath = join(__dirname, '..', req.file.path);

        await UserModel.updateOne(
          {
            _id: userId,
          },
          {
            avatarUrl: avatarPath,
          },
        );

        console.log(avatarPath);
        return res.json(req.file);
      }
    } catch (error) {}
  }
})();
