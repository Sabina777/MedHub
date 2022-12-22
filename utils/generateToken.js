import jwt from "jsonwebtoken";
const generateToken = (id) => {
  return jwt.sign({ id }, "sabmar123", {
    expiresIn: "200d",
  });
};

export default generateToken;
