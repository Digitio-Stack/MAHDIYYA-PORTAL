const { protect, restrictTo } = require("../controllers/authController");
const Subject = require("../models/subjectModel");

const router = require("express").Router();

router
  .route("/")
  .post(protect, restrictTo("superAdmin"), async (req, res) => {
    try {
      let data = await Subject.create(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get(async (req, res) => {
    try {
      let query;
      if (req.query) {
        query = req.query;
      } else {
        query = {};
      }

      let data = await Subject.find(query).populate("class");

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });

router
  .route("/:id")
  .patch(protect, restrictTo("superAdmin"), async (req, res) => {
    try {
      let data = await Subject.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  })

  .get(async (req, res) => {
    try {
      let data = await Subject.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;
