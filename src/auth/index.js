import userModel from "../models/users.js";
import atob from "atob";

export const basicAut = async (req, res, next) => {
  console.log(req.headers);

  if (!req.headers.authorization) {
    console.log('Please provide credentials in Authorization header!"');
  } else {
    const decodedPass = atob(req.headers.authorization.split(" ")[1]);

    const [email, pass] = decodedPass.split(":");

    const user = await userModel.checkPass(email, pass);
  }
  next();
};
