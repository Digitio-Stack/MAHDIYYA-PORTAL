const Branch = require("../models/branchModel");
const globalFuctions = require("../utils/globalFuctions");
const Auth = require("../models/authModel");
// const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");


exports.createBranch = catchAsync(async (req, res, next) => {
  let data = await Branch.create(req.body);
  let user = await Auth.create({ ...req.body, branch: data._id });
  data.admin = user._id;
  data.save();
  res.status(200).json(data);
});

exports.editBranch = async (req, res, next) => {
  let branchId;
  if (req.user.role === "superAdmin") {
    branchId = req.params.id;
  } else if (req.user.role === "admin") {
    branchId = req.user.branch;
  }
  try {
    let data = await Branch.findByIdAndUpdate(branchId, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getBranch = globalFuctions.getOne(Branch);
exports.getAllBranches = globalFuctions.getAll(Branch);
exports.deleteBranch = globalFuctions.deleteOne(Branch);

exports.updateCoverImage = catchAsync(async (req, res, next) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      let data = await Branch.findByIdAndUpdate(
        req.user.branch._id,
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
