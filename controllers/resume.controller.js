import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuid4 from 'uuid4';
import UserModel from '../models/user.js';
import ResumeModel from '../models/resume.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imgFilePath = join(__dirname, '..', 'uploads', 'users', 'default.png');

export const ResumeController = new (class UserController {
  async updateResume(req, res) {
    try {
      const userId = req.userId;

      const bodyData = req.body;

      const userData = await UserModel.findById(userId);

      if (!userData) {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      const resumeData = await ResumeModel.findOne({ user: userData._id });

      if (!resumeData) {
        const resume = new ResumeModel({ user: userData._id, ...bodyData });
        resume.save();

        return res.json(resume);
      }

      const returningObj = {
        ...resumeData._doc,
        ...bodyData,
      };

      await ResumeModel.updateOne(
        {
          user: userData._id,
        },
        {
          ...bodyData,
        },
      );
      res.json(returningObj);
    } catch (error) {}
  }
  async getResume(req, res) {
    const userId = req.userId;

    const resumeData = await ResumeModel.findOne({ user: userId });

    res.json(resumeData);
  }
  async deleteResume(req, res) {
    try {
      const userId = req.userId;
      // const { id } = req.params;

      const resume = await ResumeModel.findOne({ user: userId });

      if (!resume) {
        return res.status(401).json({ message: 'Резюме не найдено' });
      }

      await ResumeModel.deleteOne({ user: userId });

      res.json({ message: 'Резюме удалено успешно!' });
    } catch (error) {}
  }
})();

