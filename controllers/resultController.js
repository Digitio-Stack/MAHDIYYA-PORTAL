const { default: mongoose } = require("mongoose");
const Result = require("../models/resultModel");
const Student = require("../models/studentModel");
const { deleteOne } = require("../utils/globalFuctions");

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate("student").populate("exam");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyResults = async (req, res) => {
  try {
    let student = await Student.findOne({ registerNo: req.params.registerNo });
    let results = await Result.find({
      student: student._id,
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
      percentage: roundedPercentage,
      totalPossibleMarks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
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
        percentage: roundedPercentage,
        totalPossibleMarks,
      });
    } else if (req.query.classId && req.query.examId) {
      results = await Result.find({
        class: mongoose.Types.ObjectId(req.query.classId),
        exam: mongoose.Types.ObjectId(req.query.examId),
      })
        .populate("student")
        .populate("subject");
      if (results.length === 0) {
        return res.status(404).json({ message: "No results found" });
      }
      const studentResults = {};
      results.forEach((result) => {
        const studentId = result.student._id.toString();
        if (!studentResults[studentId]) {
          studentResults[studentId] = {
            student: result.student,
            totalMarks: 0,
            subjectResults: [],
          };
        }
        studentResults[studentId].totalMarks += result.marksObtained;
        studentResults[studentId].subjectResults.push({
          subject: result.subject,
          marksObtained: result.marksObtained,
        });
      });
    
      // Sort the students based on the total marks obtained
      const sortedStudents = Object.values(studentResults).sort(
        (a, b) => b.totalMarks - a.totalMarks
      );
    
      const modifiedResults = sortedStudents.map((studentResult, index) => {
        const totalMarks = studentResult.subjectResults.reduce(
          (sum, subjectResult) => sum + subjectResult.subject.totalMarks,
          0
        );
        const marksObtained = studentResult.totalMarks;
        const percentage = (marksObtained / totalMarks) * 100;
        const passed = studentResult.subjectResults.every(
          (subjectResult) => subjectResult.marksObtained >= 40
        );

        const rank = index + 1; // Assign rank based on the sorted order
    
        return {
          student: studentResult.student,
          subjectResults: studentResult.subjectResults,
          passed,
          failed: !passed,
          percentage,
          rank,
          marksObtained,
          totalMarks
          // Add any other required fields here
        };
      });
      return res.json(modifiedResults);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getGlobalResults = async (req, res) => {
  try {
    let data = await Result.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "student_info",
        },
      },
      {
        $unwind: "$student_info",
      },
      {
        $lookup: {
          from: "branches",
          localField: "student_info.branch",
          foreignField: "_id",
          as: "branch_info",
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "student_info.class",
          foreignField: "_id",
          as: "class_info",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject",
          foreignField: "_id",
          as: "subjectInfo",
        },
      },
      {
        $unwind: "$branch_info",
      },
      {
        $unwind: "$class_info",
      },
      {
        $unwind: "$subjectInfo",
      },

      {
        $group: {
          _id: {
            className: "$class_info.className",
            class_id: "$class_info._id",
            branchName: "$branch_info.branchName",
            branch_id: "$branch_info._id",
            branchCode: "$branch_info.branchCode",
            subject: "$subjectInfo.subjectName",
            examId: "$exam",
          },
          count: { $sum: 1 }, // Optionally, you can count the number of results for each group
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createResults = async (req, res) => {
  const resultsData = req.body; // Array of objects containing student results

  try {
    const results = await Promise.all(
      resultsData.map(async (resultData) => {
        const {
          student,
          exam,
          marksObtained,
          class: studentClass,
          subject,
        } = resultData;

        const existingResult = await Result.findOne({ student, subject });

        if (existingResult) {
          // Update existing result
          existingResult.marksObtained = marksObtained;
          await existingResult.save();
          return existingResult;
        } else {
          // Create a new result
          const newResult = new Result({
            student,
            exam,
            marksObtained,
            class: studentClass,
            subject,
          });
          await newResult.save();
          return newResult;
        }
      })
    );

    res.status(201).json(results);
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

exports.deleteResult = deleteOne(Result);
