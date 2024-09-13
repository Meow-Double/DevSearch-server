import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import WorkModel from '../models/work.js';
import UserModel from '../models/user.js';

import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const imgFilePath = join(__dirname, '..', 'uploads', 'users', 'default.png');

export const WorkController = new (class WorkController {
  async createWork(req, res) {
    try {
      const body = req.body;
      const userId = req.userId;

      console.log(req.file);

      const user = await UserModel.findById(userId);

      const authorData = {
        id: user._id,
        name: user._doc.name,
        avatarUrl: user._doc.avatarUrl,
      };
      const work = new WorkModel({
        user: userId,
        ...body,
        author: authorData,
      });

      work.save();
      return res.json({ work });
    } catch (error) {}
  }
  async getWork(req, res) {
    try {
      const workId = req.params.id;
      const work = await WorkModel.findById(workId);

      res.json(work._doc);
    } catch (error) {}
  }
  async getWorkCards(req, res) {
    try {
      const workData = await WorkModel.find().sort({ _id: 1 }).limit(10);

      const workCards = workData.map((item) => ({
        specialization: item.specialization,
        workExperience: item.workExperience,
        paycheck: item.paycheck,
        company_name: item.company_name,
        specialization_desc: item.specialization_desc,
        id: item._id,
      }));

      res.json(workCards);
    } catch (error) {
      res.json('err');
    }
  }
  async uploadImg(req, res) {
    try {
      if (req.file) {
        return res.json(req.file);
      }
    } catch (error) {}
  }
  async getMyWorks(req, res) {
    try {
      const userId = req.userId;

      const worksData = await WorkModel.find({ user: userId });

      const newWorks = worksData.map((work) => ({
        id: work._id,
        specialization: work.specialization,
        watching: work.watching,
        responded: work.responded,
      }));

      res.json(newWorks);
    } catch (error) {}
  }
})();
