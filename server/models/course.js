// models/course.js

import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the schema for the Course model
const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    required: true,
    type: String,
  },
});

// Create the Course model
const Course = model("course", courseSchema, "course_store");

// Export the model for use in other files
export default Course;
