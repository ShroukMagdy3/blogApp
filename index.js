import express from "express";
import dotenv from "dotenv";
import bootstrap from "./src/app.controller.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;

await bootstrap(app, express);

if (!process.env.VERCEL) {
  app.listen(port, () => console.log(`app listening on port ${port}!`));
}

export default app;
