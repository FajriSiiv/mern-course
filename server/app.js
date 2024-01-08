// index.js
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import routerCourse from "./router/course.js";
import routerUser from "./router/user.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/course", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

// Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(routerUser);
app.use(routerCourse);

app.get("/check-cookies", (req, res) => {
  console.log("Cookies:", JSON.stringify(req.cookies));
  res.send("Check Cookies");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
