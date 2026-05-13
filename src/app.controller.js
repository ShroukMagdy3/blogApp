import checkConnection from "./DB/connectionDB.js";
import { handleError } from "./middleware/globalErrorHandling.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import userRouter from "./modules/users/users.controller.js";
import postRouter from "./modules/posts/posts.controller.js";


const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 50,
  handler: (req, res, options, next) => {
    res.status(400)
      .json({
        error: "too many requests please wait one minute and send again",
      });
  },
  skipSuccessfulRequests: true,
});


const bootstrap = async (app, express) => {
  app.use(cors({
    origin: "*",
  
  }))
  app.use(express.json());
  app.use(limiter);
  app.use(helmet());
  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "welcome to my app" })
  })
  await checkConnection();
  
  app.use("/api/auth", userRouter)
  app.use("/api/posts", postRouter)

  app.use("{/*demo}", (req, res, next) => {
    res.status(404).json({ message: "this url not found" });
  });
  app.use(handleError);
};

export default bootstrap;

