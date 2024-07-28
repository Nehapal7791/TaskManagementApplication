import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.route";
const app: Application = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT: number = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Task Management Application </h1>");
});
app.use("/api/v1", router);
app.listen(PORT, async () => {
  console.log(`🗄️  Server Fire on http://localhost/${PORT}`);

  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("🛢️  Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});
