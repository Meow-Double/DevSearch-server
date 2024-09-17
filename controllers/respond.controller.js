import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import RespondModel from '../models/respond.js';
import WorkModel from '../models/work.js';
import UserModel from '../models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const RespondController = new (class UserController {
  async getResponds(req, res) {
    try {
      const userId = req.userId;
      const respondData = await RespondModel.findOne({ user: userId });
      res.json(respondData._doc.responds);
    } catch (error) {}
  }
  async respondWork(req, res) {
    try {
      const body = req.body;
      const userId = req.userId;
      const userWorks = await WorkModel.find({ user: userId });

      const findElement = userWorks.find((item) => String(item._id) === body.workId);

      if (findElement) {
        return res.status(401).json({ message: 'Вы не можете откликнуться на свою же вакансию' });
      }

      const respondsData = await RespondModel.findOne({ user: userId });

      const existId = respondsData._doc.responds.find((item) => item.workId === body.workId);

      if (existId) {
        return res.status(401).json({ message: 'Вы уже откликнулись на данную вакансию' });
      }

      await RespondModel.updateOne(
        {
          user: userId,
        },
        { $push: { responds: body } },
      );

      const userData = await UserModel.findById(userId);

      const userWorkObj = {
        id: userId,
        avatarUrl: userData._doc.avatarUrl,
        name: userData._doc.name,
      };

      await WorkModel.findByIdAndUpdate(body.workId, {
        $push: { responded: userWorkObj },
      });

      res.json(body);
    } catch (error) {}
  }
  async addWatching(req, res) {
    try {
      // const persinId = req.body.id;
      const { workId, ...other } = req.body;
      // const userId = req.userId;
      const workData = await WorkModel.findById(workId);

      const existWork = workData.watching.find((item) => item.id === other.id);

      if (existWork) {
        return res.status(401).json({ message: 'Пользователь уже рассматривается' });
      }
      await WorkModel.findByIdAndUpdate(workId, {
        $push: { watching: other },
      });

      const respondData = await RespondModel.findOne({ user: other.id });

      const newResponds = respondData.responds.map((item) => {
        if (item.workId === workId) {
          return { ...item, status: 'Расматривается' };
        }
        return item;
      });

      await RespondModel.updateOne(
        {
          user: other.id,
        },
        {
          responds: newResponds,
        },
      );

      res.json({ message: 'Пользователь был добавлен на расмотрение' });
    } catch (error) {}
  }
  async deleteWatching(req, res) {
    try {
      // const persinId = req.body.id;
      //  const { workId, ...other } = req.body;
      const { userId } = req.body;
      const { workId } = req.params;

      const MyWorkCard = await WorkModel.findById(workId);
      const watching = MyWorkCard.watching;

      const newWatching = watching.filter((item) => item.id !== userId);

      await WorkModel.updateOne(
        {
          _id: workId,
        },
        {
          watching: newWatching,
        },
      );

      res.json({ message: 'Пользователь был удалён с расмотрения', watching: newWatching });
    } catch (error) {}
  }
})();
