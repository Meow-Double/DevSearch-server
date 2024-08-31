import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imgFilePath = join(__dirname, '..', 'uploads', 'users', 'default.png');

export const UserController = new (class UserController {
  async register(req, res) {
    try {
      const { password, ...data } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const avatarUrl = imgFilePath;

      const doc = new UserModel({
        ...data,
        avatarUrl,
        passwordHash: hash,
      });

      const user = await doc.save();

      const token = jwt.sign(
        {
          email: data.email,
          id: user._id,
        },
        process.env.AUTH_SECRET_KEY,
        {
          expiresIn: '30d',
        },
      );

      const { passwordHash, ...userData } = user._doc;
      return res.json({ user: { ...userData }, token });
    } catch (error) {
      res.status(500).json({ messages: 'Не удалось зарегестрироваться' });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      const isValidPSW = await bcrypt.compare(password, user._doc.passwordHash);

      if (!isValidPSW) {
        return res.status(403).json({ messages: 'Не верный логин или пароль' });
      }

      const token = jwt.sign(
        {
          email,
          id: user._id,
        },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: '30d' },
      );

      const { passwordHash, ...userData } = user._doc;

      return res.json({ user: { ...userData }, token });
    } catch (error) {
      res.status(500).json({ message: 'Не удалось авторизоваться' });
    }
  }
  async auth(req, res) {
    try {
      console.log(req.userId);
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      const { passwordHash, ...userData } = user._doc;
      return res.json({ ...userData });
    } catch (error) {
      res.status(500).json({ message: 'Не удалось зарегестрироваться' });
    }
  }
})();
