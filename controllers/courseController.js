const Course = require("../models/courseModel");
const globalFunctions=require('../utils/globalFuctions')

exports.deleteCourse=globalFunctions.deleteOne(Course)