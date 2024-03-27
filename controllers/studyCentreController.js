const globalFuctions = require("../utils/globalFuctions");
const Auth = require("../models/authModel");
// const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const StudyCentre = require("../models/studyCentreModel");


exports.createBranch = catchAsync(async (req, res, next) => {
  let data = await StudyCentre.create(req.body);
  let user = await Auth.create({ ...req.body, branch: data._id });
  data.admin = user._id;
  data.save();
  res.status(200).json(data);
});

exports.editBranch = async (req, res, next) => {
  let studyCentreId;
  if (req.user.role === "superAdmin") {
    studyCentreId = req.params.id;
  } else if (req.user.role === "admin") {
    studyCentreId = req.user.branch;
  }
  try {
    let data = await StudyCentre.findByIdAndUpdate(studyCentreId, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getBranch = globalFuctions.getOne(StudyCentre);
exports.getAllBranches = globalFuctions.getAll(StudyCentre);
exports.deleteBranch = globalFuctions.deleteOne(StudyCentre);

exports.updateCoverImage = catchAsync(async (req, res, next) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      let data = await StudyCentre.findByIdAndUpdate(
        req.user.StudyCentre._id,
        {
          imageCover: req.file.location,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      res.status(200).json({
        message: "image uploaded successfully",
        data,
      });
    }
  });
});
