const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNumber: String,
  year: String,
  degree: String,
  role: String,
  project: String,
  hobby: String,
  certification: String,
  internship: String,
  aim: String,
  profileImage: String,
});

module.exports = mongoose.model("Member", MemberSchema);
