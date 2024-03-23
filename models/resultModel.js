const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  marksObtained: { type: Number, required: true },
  yearAndMonth: { type: String },
});

resultSchema.path("student").validate(async function (value) {
  const count = await this.constructor.countDocuments({
    student: value,
    exam: this.exam,
    subject: this.subject,
  });
  return !count;
}, "Duplicate mark entry for the subject.");

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
