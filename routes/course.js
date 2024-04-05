const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const { protect, restrictTo } = require("../controllers/authController");
const Course = require("../models/courseModel");
const multer = require("multer");
const { deleteOne } = require("../utils/globalFuctions");
const { deleteCourse } = require("../controllers/courseController");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const streamifier = require("streamifier"); // Install this package: npm install streamifier

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });



router.post(
  "/",
  protect,
  restrictTo("superAdmin"),
  upload.single("image"),
  async (req, res, next) => {
    try {
     
      const cldRes = await cloudinary.uploader.upload(req.file.path);
      let data = await Course.create({
        ...req.body,
        image: cldRes.secure_url,
      });
      res.status(201).json({ message: "Course Added", course: data });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
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
    let data = await Course.findById(req.params.id)
    res.status(200).json(data);
  })
);

module.exports = router;
