const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const { createResult, getResults } = require("../controllers/resultController");

router.post("/", protect, restrictTo("admin"), createResult);
router.get("/", protect, restrictTo("admin"), getResults);

module.exports = router;
