const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const { protect, restrictTo } = require("../controllers/authController");
const Course = require("../models/courseModel");
const multer = require("multer");
const { deleteOne } = require("../utils/globalFuctions");
const { deleteCourse } = require("../controllers/courseController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/course");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post(
  "/",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res, next) => {
    const uploadSingle = uploads.single("image");
    uploadSingle(req, res, async (err) => {
      if (!err) {
        let data = await Course.create({
          ...req.body,
          image: req.file.filename,
        });
        res.status(200).json(data);
      } else {
        console.log(err);
      }
    });
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    let data = await Course.find().sort("-createdAt");
    res.status(200).json(data);
  })
);
router.patch(
  "/:id",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res) => {
    await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ deleted: true });
  })
);
router.delete("/:id", protect, restrictTo("superAdmin"), deleteCourse);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    let data = await Course.findById(req.params.id).populate(
      "learners.student"
    );
    res.status(200).json(data);
  })
);

module.exports = router;
