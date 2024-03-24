const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  deleted: { type: Boolean, default: false },
  recipients: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

messageSchema.pre(/^find/, function(next) {
  // Only include documents where the deleted field is not true
  this.find({ deleted: { $ne: true } });
  next();
});
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
