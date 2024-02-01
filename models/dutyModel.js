const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for your data
const dutySchema = new Schema({
  institutionNumber: {
    type: String,
    required: true,
  },
  institutionName: {
    type: String,
    required: true,
  },
  dates: {
    type: {
      "02-02-2024": { type: String, default: "" },
      "03-10-2024": { type: String, default: "" },
      "05-02-2024": { type: String, default: "" },
      "06-02-2024": { type: String, default: "" },
    },
    required: true,
  },
});

// Create the Mongoose model
const Duty = mongoose.model("Duty", dutySchema);

module.exports = Duty;
