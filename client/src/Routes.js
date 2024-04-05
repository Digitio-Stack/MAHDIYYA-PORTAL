import { Course, Result, Student, StudyCentre, Teacher } from "./pages";
import AdminHome from "./pages/AdminHome";
import ViewTeacher from "./pages/ViewTeacher";
import FileUpload from "./pages/admin/FileUpload";
import MyMessages from "./pages/admin/MyMessages";
import MyUploads from "./pages/admin/MyUploads";
import Admissions from "./pages/admin/admission/Admissions";
import AdmissionRequests from "./pages/superAdmin/AdmissionRequests";
import AllSubjects from "./pages/superAdmin/AllSubjects";
import ClassManagment from "./pages/superAdmin/ClassManagment";
import CreateExam from "./pages/superAdmin/CreateExam";
import CreateMessage from "./pages/superAdmin/CreateMessage";
import EditSubject from "./pages/superAdmin/EditSubject";
import RecycleBin from "./pages/superAdmin/RecycleBin";
import UploadedFiles from "./pages/superAdmin/UploadedFiles";
import CourseHome from "./pages/superAdmin/course/CourseHome";
import CourseTable from "./pages/superAdmin/course/CourseTable";
import CreateNotification from "./pages/superAdmin/notification/CreateNotification";

export const SuperAdminRoutes = [
  {
    route: "/create-study-centre",
    component: <StudyCentre.CreateStudyCentre />,
    role: "superAdmin",
  },
  {
    route: "/study-centres",
    component: <StudyCentre.AllStudyCentres />,
    role: "superAdmin",
  },
  {
    route: "/study-centre-section",
    component: <StudyCentre.StudyCentreHome />,
    role: "superAdmin",
  },
  {
    route: "/edit-branch/:id",
    component: <StudyCentre.EditBranch />,
    role: "superAdmin",
  },

  {
    route: "/all-centre-students",
    component: <StudyCentre.MahdiyyaStudents />,
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
    route: "/courses",
    component: <CourseHome />,
    role: "superAdmin",
  },
  {
    route: "/course-table",
    component: <CourseTable />,
    role: "superAdmin",
  },

  {
    route: "/create-notification",
    component: <CreateNotification />,
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
    route: "/create-course",
    component: <Course.CreateCourse />,
    role: "superAdmin",
  },
  {
    route: "/edit-course/:id",
    component: <Course.EditCourse />,
    role: "superAdmin",
  },
  {
    route: "/all-courses",
    component: <Course.AllCourses />,
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
    route: "/create-messages",
    component: <CreateMessage />,
    role: "superAdmin",
  },
  {
    route: "/trash",
    component: <RecycleBin />,
    role: "superAdmin",
  },

  {
    route: "/add-result",
    component: <Result.AddResult />,
    role: "superAdmin",
  },
  {
    route: "/result-section/",
    component: <Result.ResultHome />,
    role: "superAdmin",
  },
  {
    route: "/edit-result/",
    component: <Result.EditResult />,
    role: "superAdmin",
  },
  {
    route: "/study-centre/:centreId",
    component: <StudyCentre.StudyCentreView />,
    role: "superAdmin",
  },
];

export const AdminRoutes = [
  {
    route: "/",
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
    route: "/result-view/",
    component: <Result.ResultView />,
  },
];
