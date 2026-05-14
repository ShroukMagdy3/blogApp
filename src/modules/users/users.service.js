import { nanoid } from "nanoid";
import {Hash , compare} from "../../utilities/hash.js";
import userModel from "../../DB/models/user.model.js";
import { generateToken } from "../../utilities/token.js";
import postModel from "../../DB/models/post.model.js";



export const signUp = async (req, res, next) => {
  console.log(req.body)
  const { name, email, password, cPassword } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    throw new Error("this user already exist", { cause: 409 });
  }
  
  const hash = await Hash(password, process.env.SALT_ROUNDS);
  const userCreated = await userModel.create({
    name,
    email,
    password: hash,
  });
  await userCreated.save();
  return res.status(201).json({ message: "success created", userCreated });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("This email not found Please Register first", { cause: 404 });
  }
  const match = await compare(password, user.password);
  if (!match) {
    throw new Error("invalid password", { cause: 400 });
  }

  const access_token = await generateToken({
    payload: { id: user._id, email },
    signature: process.env.SIGNATURE_access_USER,
    options: {
      expiresIn: "1d",
      jwtid: nanoid(),
    },
  });

  const refresh_token = await generateToken({
    payload: { id: user._id, email },
    signature:process.env.SIGNATURE_REFRESH_USER,
    options: { expiresIn: "1y", jwtid: nanoid() },
  });
  return res.status(200).json({ message: "Done",user, access_token, refresh_token });
};

export const getProfile = async (req, res) => {
  try {
    const posts = await postModel
      .find({ author: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Profile fetched successfully",
      user: req.user,
      posts,
    });
  } catch (error) {
     console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};