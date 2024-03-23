const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Subject Name is required"],
    uppercase: true,
    maxLength: [30, "30 characters are allowed"],
  },
  subjectCode: {
    type: String,
    required: [true, "Subject Code is required"],
    maxLength: [30, "30 characters are allowed"],
    uppercase: true,
  },
  totalMarks: {
    type: Number,
    required: [true, "Total mark is required"],
  },
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
