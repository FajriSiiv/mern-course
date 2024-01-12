// index.js
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import routerCourse from "./router/course.js";
import routerUser from "./router/user.js";
import cors from "cors";
import dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";

const app = express();
const port = 5000;

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.HELLO_ENV;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:  function (origin, callback) {
      // Check if the origin is allowed (you can customize this logic)
      const allowedOrigins =  "https://frontend-course-mern.vercel.app";
      const isAllowed = allowedOrigins.includes(origin);
      
      callback(null, isAllowed);
    },
    credentials: true, // Enable cookies with credentials
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

if (!process.env.HELLO_ENV) {
  console.error(
    "MongoDB URI is not defined. Check your environment variables."
  );

  process.exit(1);
}

mongoose.connect(process.env.HELLO_ENV);

const db = mongoose.connection;

// Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// app.use(routerUser);
app.use(routerCourse);

app.get("/check-cookies", (req, res) => {
  console.log("Cookies:", JSON.stringify(req.cookies));
  res.send("Check Cookies");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
