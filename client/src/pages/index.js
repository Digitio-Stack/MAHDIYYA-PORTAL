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
import MahdiyyaStudents from "./superAdmin/MahdiyyaStudents.jsx";
import AllBranches from "./superAdmin/AllBranches";
import AllUsers from "./superAdmin/AllUsers";
import BranchBasedDetails from "./superAdmin/BranchBasedDetails";
import BranchBasedTeachers from "./superAdmin/BranchBasedTeachers";
import ClassBasedStudents from "./superAdmin/ClassBasedStudents.jsx";
import CreateBranch from "./superAdmin/CreateBranch";
import EditBranch from "./superAdmin/EditBranch";

export const Teacher = {
  EditTeacher,
  AllTeachers,
  CreateTeacher,
  BranchBasedTeachers,
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
export const Branch = {
  AllBranches,
  EditBranch,
  CreateBranch,
  MahdiyyaStudents,
  BranchBasedDetails,
};
export const Users = {
  AllUsers,
};
