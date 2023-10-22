const mongoose = require('mongoose');

// Define the Mentor schema
const mentorSchema = new mongoose.Schema({
    name: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Mentor = mongoose.model('Mentor', mentorSchema);

// Export the Mentor model
module.exports = Mentor; 
