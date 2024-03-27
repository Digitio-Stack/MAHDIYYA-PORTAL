const Student = require("../models/studentModel");
const globalFunctions = require("../utils/globalFuctions");
const mongoose = require("mongoose");
const xlsx = require("xlsx");

exports.getStudent = globalFunctions.getOne(Student, "branch", "class");

exports.getAllStudents = async (req, res, next) => {
  try {
    let query = req.query;

    if (query.class && query.branch) {
      const data = await Student.aggregate([
        {
          $match: {
            branch: mongoose.Types.ObjectId(query.branch),
            verified: true,
            class: mongoose.Types.ObjectId(query.class),
          },
        },
        {
          $lookup: {
            from: "classes",
            foreignField: "_id",
            localField: "class",
            as: "class",
          },
        },
        {
          $lookup: {
            from: "studycentres",
            foreignField: "_id",
            localField: "branch",
            as: "branch",
          },
        },
      ]);
      return res.status(200).json(data);
    } else {
      const branchStudentCounts = await Student.aggregate([
        {
          $lookup: {
            from: "studycentres",
            localField: "branch",
            foreignField: "_id",
            as: "branch",
          },
        },
        { $unwind: "$branch" },
        {
          $lookup: {
            from: "classes",
            localField: "class",
            foreignField: "_id",
            as: "class",
          },
        },
        { $unwind: "$class" },
        {
          $group: {
            _id: {
              branchName: "$branch.studyCentreName",
              className: "$class.className",
              studyCentreCode: "$branch.studyCentreCode",
            },
            studentCount: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.branchName",
            studyCentreCode: { $first: "$_id.studyCentreCode" }, // Get the first study centre code
            classes: {
              $push: {
                className: "$_id.className",
                studentCount: "$studentCount",
              },
            },
          },
        },
      ]);

      res.json(branchStudentCounts);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getAdmissions = globalFunctions.getAll(Student, "branch", "class");
exports.registerStudent = async (req, res, next) => {
  try {
    let data = await Student.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.addStudent = async (req, res, next) => {
  try {
    let data = await Student.create({ ...req.body, verified: true });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateStudent = globalFunctions.updateOne(Student);

exports.getMyStudents = async (req, res, next) => {
  try {
    let data = await Student.aggregate([
      {
        $match: {
          branch: req.user.branch,
          verified: true,
          class: mongoose.Types.ObjectId(req.params.classId),
        },
      },
      {
        $lookup: {
          from: "classes", // Change "classes" to the actual name of your Class collection
          localField: "class",
          foreignField: "_id",
          as: "class",
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.getBranchStudents = async (req, res, next) => {
  try {
    let data = await Student.aggregate([
      {
        $match: {
          branch: mongoose.Types.ObjectId(req.params.studyCentreId),
          class: mongoose.Types.ObjectId(req.params.classId),
          verified: true,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.getMyAdmissions = async (req, res, next) => {
  try {
    let data = await Student.find({ branch: req.user.branch, verified: false })
      .populate("class", "className")
      .sort({ createdAt: 1 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.getAllAdmissionRequests = async (req, res, next) => {
  try {
    let data = await Student.find({ verified: false })
      .populate("branch", "studyCentreName")
      .populate("class", "className")
      .sort({ createdAt: 1 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAdmissionRequests = async (req, res, next) => {
  try {
    let data = await Student.aggregate([
      { $match: { verified: false } },
      {
        $group: {
          _id: "$branch",
          numStudents: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "studycentres",
          localField: "_id",
          foreignField: "_id",
          as: "branch",
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.deleteStudent = globalFunctions.deleteOne(Student);
exports.excelUpload = async (req, res) => {
  try {
    // Read uploaded file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    if (jsonData.length === 0) {
      res.status(400).json({ message: "Please add data" });
    } else {
      await Promise.all(
        jsonData.map(async (data) => {
          const student = new Student({
            ...data,
            class: req.body.class,
            branch: req.user.branch,
            verified: true,
          });
          await student.save();
        })
      );

      res.status(200).json({ message: "Excel data uploaded successfully" });
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
