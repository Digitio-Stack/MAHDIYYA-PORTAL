const multer = require("multer");
const { protect, restrictTo } = require("../controllers/authController");
const studentController = require("../controllers/studentController");

const router = require("express").Router();

const uploads = multer();

router.post("/register", studentController.registerStudent);
router.post("/add", studentController.addStudent);

router.post("/", studentController.getAdmissions);
router.get(
  "/my-students/data/:classId",
  protect,
  restrictTo("admin"),
  studentController.getMyStudents
);
router.get(
  "/data/:studyCentreId/:classId",
  protect,
  restrictTo("superAdmin"),
  studentController.getBranchStudents
);
router.get(
  "/my-admissions/data",
  protect,
  restrictTo("admin"),
  studentController.getMyAdmissions
);
router.get(
  "/",
  protect,
  restrictTo("superAdmin"),
  studentController.getAllStudents
);

router.get(
  "/admissions/data",
  protect,
  restrictTo("superAdmin"),
  studentController.getAllAdmissionRequests
);

router.get("/:id", studentController.getStudent);
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  studentController.deleteStudent
);
router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  studentController.updateStudent
);

router.post(
  "/excel",
  protect,
  uploads.single("file"),
  studentController.excelUpload
);
module.exports = router;
