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
