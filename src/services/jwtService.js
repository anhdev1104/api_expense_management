import jwt from 'jsonwebtoken';

export const generateAccessToken = payload => {
  const accessToken = jwt.sign(
    {
      id: payload.id,
      role: payload.role,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: process.env.JWT_ACCESS_EXP }
  );
  return accessToken;
};

export const generateRefreshToken = payload => {
  const refreshToken = jwt.sign(
    {
      id: payload.id,
      role: payload.role,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: process.env.JWT_REFRESH_EXP }
  );
  return refreshToken;
};
