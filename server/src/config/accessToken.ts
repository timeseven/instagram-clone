import jwt from "jsonwebtoken";

const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as any, {
    expiresIn: "10d",
  });
};

export default generateAccessToken;
