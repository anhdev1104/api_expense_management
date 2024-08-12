import jwt from 'jsonwebtoken';

const authToken = {
  verifyToken: (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) {
      return res.status(401).json('Vui lòng đăng nhập để thực hiện hành động này!');
    }
    const accessToken = authHeaders && authHeaders.split(' ')[1];
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) return res.status(403).json('Token không hợp lệ !');
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  },
};

export default authToken;
