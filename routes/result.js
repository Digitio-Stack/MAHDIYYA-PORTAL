const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const {
  getResults,
  createResults,
  getMyResults,
  getGlobalResults,
} = require("../controllers/resultController");

router.post("/", protect, restrictTo("superAdmin"), createResults);
router.get("/", protect, restrictTo("admin", "superAdmin"), getResults);
router.get("/data", protect, restrictTo("superAdmin"), getGlobalResults);
router.get("/:examId/:registerNo", getMyResults);
module.exports = router;
