const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const branchRoutes = require("./routes/branch");
const teacherRoutes = require("./routes/teacher");
const dutyRoutes = require("./routes/duty");
const notificationRoutes = require("./routes/notification");
const subjectRoutes = require("./routes/subject");
const classRoute = require("./routes/class");
const trashRoute = require("./routes/trash");
const courseRoute = require("./routes/course");
const examRoute = require("./routes/exam");
const downloadRoute = require("./routes/downloads");
const uploadRoute = require("./routes/uploads");
const messageRoute = require("./routes/message");
const hallTicketRoute = require("./routes/hallTicket");
const resultRoute = require("./routes/result");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");

dotenv.config();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.enable("trust proxy");

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
//data sanitization against NoSql attacks
app.use(mongoSanitize());
//data sanitization against xss
app.use(xss()); //prevent from inserting HTML or others to DB
app.use(compression()); //works on texts
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/duty", dutyRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/class", classRoute);
app.use("/api/course", courseRoute);
app.use("/api/exam", examRoute);
app.use("/api/downloads", downloadRoute);
app.use("/api/uploads", uploadRoute);
app.use("/api/messages", messageRoute);
app.use("/api/hall-ticket", hallTicketRoute);
app.use("/api/result", resultRoute);
app.use("/api/trash", trashRoute);

process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, "public")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
