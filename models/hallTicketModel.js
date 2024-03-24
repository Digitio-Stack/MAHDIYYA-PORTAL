const mongoose = require("mongoose");

const HallTicketSchema = new mongoose.Schema({
  exam: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Exam",
  },
  class: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Class",
  },
  deleted: { type: Boolean, default: false },
  subjects: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      time: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  ],
});
HallTicketSchema.pre(/^find/, function (next) {
  // Only include documents where the deleted field is not true
  this.find({ deleted: { $ne: true } });
  next();
});
const HallTicket = mongoose.model("HallTicket", HallTicketSchema);
module.exports = HallTicket;
