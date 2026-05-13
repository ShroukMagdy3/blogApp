import express from "express";
import dotenv from "dotenv";
import bootstrap from "../src/app.controller.js";

dotenv.config();
const app = express();

const appReady = bootstrap(app, express);

export default async function handler(req, res) {
  try {
    await appReady;
    return app(req, res);
  } catch (error) {
    console.log("app failed to start", error);
    return res.status(500).json({
      message: "Database connection failed",
    });
  }
}
