const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for your data
const dutySchema = new Schema({
  institutionNumber: {
    type: String,
    required: true,
  },
  deleted: { type: Boolean, default: false },

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

dutySchema.pre(/^find/, function(next) {
  // Only include documents where the deleted field is not true
  this.find({ deleted: { $ne: true } });
  next();
});
// Create the Mongoose model
const Duty = mongoose.model("Duty", dutySchema);

module.exports = Duty;
