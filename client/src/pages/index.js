import ProtectedRoutes from "../ProtectRoutes";
import Restricted from "../Restricted";
import AddStudents from "../components/New Admission/NewAdmission.jsx";
import Login from "./Login";
import NotAllowed from "./NotAllowed";
import NotLoggedIn from "./NotLoggedIn";
import NotFound from "./Not_found";
import AllClasses from "./admin/class/AllClasses";
import AddStudent from "./admin/student/AddStudent.jsx";
import EditStudent from "./admin/student/EditStudent.jsx";
import AllTeachers from "./admin/teacher/AllTeachers.jsx";
import CreateTeacher from "./admin/teacher/CreateTeacher.jsx";
import EditTeacher from "./admin/teacher/EditTeacher.jsx";
import Profile from "./student/StudentProfile.jsx";
import AllStudyCentres from "./superAdmin/study-centre/AllStudyCentres.jsx";
import StudyCentreTeachers from "./superAdmin/study-centre/StudyCentreTeachers.jsx";
import ClassBasedStudents from "./superAdmin/ClassBasedStudents.jsx";
import CreateStudyCentre from "./superAdmin/study-centre/CreateStudyCentre.jsx";
import EditStudyCentre from "./superAdmin/study-centre/EditStudyCentre.jsx";
import MahdiyyaStudents from "./superAdmin/MahdiyyaStudents.jsx";
import StudyCentreHome from "./superAdmin/study-centre/StudyCentreHome.jsx";
import StudyCentreView from "./superAdmin/study-centre/StudyCentreView.jsx";
import AddResult from "./superAdmin/result/AddResult";
import EditResult from "./superAdmin/result/EditResult";
import ResultHome from "./superAdmin/result/ResultHome";
import ResultView from "./superAdmin/result/ResultView";

import AllCourses from "./superAdmin/course/AllCourses.jsx";
import CreateCourse from "./superAdmin/course/CreateCourse";
import EditCourse from "./superAdmin/course/EditCourse";

export const Teacher = {
  EditTeacher,
  AllTeachers,
  CreateTeacher,
  StudyCentreTeachers,
};
export const Auth = {
  Login,
  ProtectedRoutes,
  Restricted,
  NotAllowed,
  NotFound,
  NotLoggedIn,
};
export const Student = {
  ClassBasedStudents,
  EditStudent,
  AddStudents,
  Profile,
  AllClasses,
  AddStudent,
};
export const StudyCentre = {
  AllStudyCentres,
  EditStudyCentre,
  CreateStudyCentre,
  MahdiyyaStudents,
  StudyCentreHome,
  StudyCentreView,
};
export const Result = {
  AddResult,
  EditResult,
  ResultHome,
  ResultView,
};
export const Course = {
  CreateCourse,
  EditCourse,
  AllCourses
};
