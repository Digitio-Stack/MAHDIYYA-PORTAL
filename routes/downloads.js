const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

const downloadSchema = new mongoose.Schema({
  fileName: { type: String, required: [true, "File is required"] },
  title: { type: String, required: [true, '"download" title is required'] },
  type: { type: String, required: true, enum: ["student", "admin"] },
});
const Download = mongoose.model("Download", downloadSchema);

async function uploadFile(file) {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await uploadFile(dataURI);

    let data = await Download.create({
      title: req.body.title,
      fileName: cldRes.secure_url,
      type: req.body.type,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    let data = await Download.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/student", async (req, res, next) => {
  try {
    let data = await Download.find({ type: "student" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let data = await Download.findByIdAndDelete(req.params.id);
    // fs.unlinkSync(`./uploads/${data.fileName}`);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
