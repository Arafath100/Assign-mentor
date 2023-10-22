const mongoose = require("mongoose");

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  cMentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  pMentor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }],
});

const Student = mongoose.model("Student", studentSchema);

// Export the Student model.
module.exports = Student;
