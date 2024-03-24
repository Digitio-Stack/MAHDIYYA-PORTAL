const Exam = require("../models/examModel");

const router = require("express").Router();
const { deleteOne } = require("../utils/globalFuctions");

router.post("/", async (req, res, next) => {
  try {
    let data = await Exam.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let data = await Exam.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    let data = await Exam.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.patch("/:id", async (req, res, next) => {
  try {
    let data = await Exam.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", deleteOne(Exam));

module.exports = router;
