const { default: mongoose } = require("mongoose");
const Result = require("../models/resultModel");

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate("student").populate("exam");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    let results;

    // Check if the 'studentId' query parameter is present
    if (req.query.studentId) {
      results = await Result.find({
        student: mongoose.Types.ObjectId(req.query.studentId),
      })
        .populate("student")
        .populate("subject")
        .populate("exam");

      if (results.length === 0) {
        return res.status(200).json({ message: "Result Not Found" });
      }

      const allSubjectsPassed = results.every(
        (result) => result.marksObtained >= 40
      );
      const grandTotal = results.reduce(
        (total, result) => total + result.marksObtained,
        0
      );

      // Calculate total possible marks (assuming each subject has a maximum of 100 marks)
      const totalPossibleMarks = results.length * 100;

      // Calculate percentage
      const percentage = (grandTotal / totalPossibleMarks) * 100;
      const roundedPercentage = Math.floor(percentage);

      return res.json({
        results,
        status: allSubjectsPassed ? "Promoted" : "Not promoted",
        grandTotal,
        percentage:roundedPercentage,
        totalPossibleMarks,
      });
    }
    // Check if the 'subjectId' query parameter is present
    else if (req.query.subjectId) {
      results = await Result.find({
        "exam.subject": mongoose.Types.ObjectId(req.query.subjectId),
      })
        .populate("student")
        .populate({
          path: "exam",
          populate: { path: "subject" },
        });

      if (results.length === 0) {
        return res.status(404).json({ message: "No results found" });
      }

      return res.json({ results });
    }

    return res.status(400).json({ message: "Invalid request" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createResult = async (req, res) => {
  const result = new Result({
    student: req.body.student,
    exam: req.body.exam,
    marksObtained: req.body.marksObtained,
    subject: req.body.subject,
  });

  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (err) {
    if (
      err.name === "ValidationError" &&
      err.message.includes("Duplicate mark entry for the subject")
    ) {
      return res
        .status(400)
        .json({ error: "Duplicate mark entry for the subject." });
    }
    res.status(400).json({ message: err.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("student")
      .populate("exam");
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json({ message: "Result deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
