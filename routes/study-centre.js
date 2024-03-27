const { protect, restrictTo } = require("../controllers/authController");
const branchController = require("../controllers/studyCentreController");
const router = require("express").Router();

router.post(
  "/",
  protect,
  restrictTo("superAdmin"),
  branchController.createBranch
);
router.get("/", branchController.getAllBranches);
router.get("/:id", protect, branchController.getBranch);
router.patch("/:id", protect, branchController.editBranch);
router.delete(
  "/:id",
  protect,
  restrictTo("superAdmin"),
  branchController.deleteBranch
);

router.post(
  "/study-centre/upload-cover/",
  protect,
  branchController.updateCoverImage
);
module.exports = router;
