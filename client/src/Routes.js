import { Branch, Student, Teacher, Users } from "./pages";
import AdminHome from "./pages/AdminHome";
import ViewTeacher from "./pages/ViewTeacher";
import FileUpload from "./pages/admin/FileUpload";
import MyMessages from "./pages/admin/MyMessages";
import MyUploads from "./pages/admin/MyUploads";
import Admissions from "./pages/admin/admission/Admissions";
import Marks from "./pages/admin/marks/Marks";
import AddResult from "./pages/admin/result/AddResult";
import AdmissionRequests from "./pages/superAdmin/AdmissionRequests";
import AllSubjects from "./pages/superAdmin/AllSubjects";
import ClassManagment from "./pages/superAdmin/ClassManagment";
import CourseStudents from "./pages/superAdmin/CourseStudents";
import CreateCourse from "./pages/superAdmin/CreateCourse";
import CreateExam from "./pages/superAdmin/CreateExam";
import CreateMessage from "./pages/superAdmin/CreateMessage";
import CreateNotification from "./pages/superAdmin/CreateNotification";
import CreateSchedule from "./pages/superAdmin/CreateSchedule";
import EditCourse from "./pages/superAdmin/EditCourse";
import EditNews from "./pages/superAdmin/EditNews";
import EditSubject from "./pages/superAdmin/EditSubject";
import UploadedFiles from "./pages/superAdmin/UploadedFiles";

export const SuperAdminRoutes = [
  {
    route: "/create-branch",
    component: <Branch.CreateBranch />,
    role: "superAdmin",
  },
  {
    route: "/all-branches",
    component: <Branch.AllBranches />,
    role: "superAdmin",
  },
  {
    route: "/edit-branch/:id",
    component: <Branch.EditBranch />,
    role: "superAdmin",
  },

  {
    route: "/edit-user/:id",
    component: <Users.EditUser />,
    role: "superAdmin",
  },
  {
    route: "/all-branch-students",
    component: <Branch.MahdiyyaStudents />,
    role: "superAdmin",
  },

  {
    route: "/all-branch-students/:id",
    component: <Branch.BranchBasedDetails />,
    role: "superAdmin",
  },
  {
    route: "/all-subjects",
    component: <AllSubjects />,
    role: "superAdmin",
  },
  {
    route: "/edit-subject/:id",
    component: <EditSubject />,
    role: "superAdmin",
  },

  {
    route: "/create-notification",
    component: <CreateNotification />,
    role: "superAdmin",
  },

  {
    route: "/create-schedule",
    component: <CreateSchedule />,
    role: "superAdmin",
  },
  {
    route: "/admission-requests",
    component: <AdmissionRequests />,
    role: "superAdmin",
  },

  {
    route: "/class-management",
    component: <ClassManagment />,
    role: "superAdmin",
  },
  {
    route: "/edit-news/:id",
    component: <EditNews />,
    role: "superAdmin",
  },
  {
    route: "/create-course",
    component: <CreateCourse />,
    role: "superAdmin",
  },
  {
    route: "/edit-course/:id",
    component: <EditCourse />,
    role: "superAdmin",
  },
  {
    route: "/all-courses",
    component: <CreateCourse />,
    role: "superAdmin",
  },
  {
    route: "/create-exam",
    component: <CreateExam />,
    role: "superAdmin",
  },
  {
    route: "/uploaded-files/:id",
    component: <UploadedFiles />,
    role: "superAdmin",
  },

  {
    route: "/uploaded-files/:id",
    component: <UploadedFiles />,
    role: "superAdmin",
  },
  {
    route: "/course-students/:id",
    component: <CourseStudents />,
    role: "superAdmin",
  },
  {
    route: "/create-messages",
    component: <CreateMessage />,
    role: "superAdmin",
  },
];

export const AdminRoutes = [
  {
    route: "/admin",
    component: <AdminHome />,
  },
  {
    route: "/all-students/:classId",
    component: <Student.ClassBasedStudents />,
  },
  {
    route: "/all-classes",
    component: <Student.AllClasses />,
  },
  {
    route: "/all-teachers",
    component: <Teacher.AllTeachers />,
  },
  {
    route: "/new-student",
    component: <Student.AddStudent />,
  },
  {
    route: "/edit-student/:id",
    component: <Student.EditStudent />,
  },
  {
    route: "/teacher/:id",
    component: <ViewTeacher />,
  },
  {
    route: "/edit-teacher/:id",
    component: <Teacher.EditTeacher />,
  },
  {
    route: "/create-teacher",
    component: <Teacher.CreateTeacher />,
  },

  {
    route: "/new-admissions",
    component: <Admissions />,
  },

  {
    route: "/my-uploads",
    component: <MyUploads />,
  },
  {
    route: "/file-upload/:referenceId",
    component: <FileUpload />,
  },
  {
    route: "/my-messages",
    component: <MyMessages />,
  },
  {
    route: "/add-result",
    component: <AddResult />,
  },
  {
    route: "/marks",
    component: <Marks />,
  },
];
