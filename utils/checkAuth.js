import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Нет доступа' });
    }
  } else {
    return res.status(403).json({ message: 'Нет доступа' });
  }
};
