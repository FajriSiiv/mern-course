import express from "express";
import {
  addCourse,
  deleteCourse,
  editCourse,
  getCourse,
  getCourseById,
} from "../controllers/course.js";
import { AuthToken } from "../middleware/index.js";

const router = express.Router();

router.get("/course", getCourse);
router.get("/course/:id", getCourseById);
router.post("/course", addCourse);
router.patch("/course/:id", editCourse);
router.delete("/course/:id", deleteCourse);

export default router;
