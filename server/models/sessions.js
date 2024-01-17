const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    sessionStart: {
      type: Number,
    },
    sessionEnd: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
