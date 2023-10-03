import jwt from "jsonwebtoken";

const generateAccessToken = (id: Object) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as any, {
    expiresIn: "1d",
  });
};

export default generateAccessToken;
