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
  class: {
    type: mongoose.Types.ObjectId,
    required: [true, "Class is required"],
    ref: "Class",
  },
  deleted: { type: Boolean, default: false },
});
subjectSchema.pre(/^find/, function (next) {
  // Only include documents where the deleted field is not true
  this.find({ deleted: { $ne: true } });
  next();
});
const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
