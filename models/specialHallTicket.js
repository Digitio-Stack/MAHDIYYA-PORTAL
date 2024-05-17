const mongoose = require("mongoose");

const specialHallTicketSchame = new mongoose.Schema({
  method: String,
  institution: String,
  name: String,
  registerNo: String,
  semester: String,
  subjectsSecondSem: String,
  subjectsSixthSem: String,
});

const SpecialHallTicket = mongoose.model(
  "SpecialHallTicket",
  specialHallTicketSchame
);

module.exports = SpecialHallTicket;
