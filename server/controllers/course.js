import axios from "axios";
import Course from "../models/course.js";
import fs from "fs";

export const getCourse = async (req, res) => {
  try {
    // const filePath = "./data.json";
    // const rawData = fs.readFileSync(filePath);
    // const coursesData = JSON.parse(rawData);

    // await Course.insertMany(coursesData);

    const course = await Course.find();

    // const allCourse = [...coursesData, ...course];

    res.status(201).json(course);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById({ _id: id });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addCourse = async (req, res) => {
  const { title, description, instructor, price, startDate } = req.body;
  const MAX_ITEMS = 10;
  const courseItem = await Course.countDocuments();

  const randomImageResponse = await axios.get(
    "https://source.unsplash.com/random?web+code",
    {
      responseType: "arraybuffer",
      params: { w: 800 },
    }
  );
  const imageUrl = randomImageResponse.request.res.responseUrl;

  if (courseItem >= MAX_ITEMS) {
    return res.status(400).json({ error: "Maximum limit reached" });
  }

  try {
    const newCourse = new Course({
      title,
      description,
      instructor,
      price,
      startDate,
      imageUrl,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const editCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await Course.findByIdAndUpdate({ _id: id }, { $set: req.body });

    res.status(201).json({ msg: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await Course.deleteOne({ _id: id });

    res.status(201).json({ msg: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
