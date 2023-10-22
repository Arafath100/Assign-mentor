const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("dotenv").config(); // Load environment variables

// Import Mongoose models for Mentor and Student
const Mentor = require('./models/Mentor');
const Student =require('./models/Student');

const app = express();

// Define the port for the server, using the environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;

// Get the MongoDB connection URL from environment variables
const DB_URL = process.env.DB_URL;

// Configure the Express app to parse JSON request bodies
app.use(bodyParser.json());

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Create a new mentor
app.post("/mentor", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor); 
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a new student
app.post("/student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student); 
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign students to a mentor
app.post("/mentor/:mentorId/assign", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    const students = await Student.find({ _id: { $in: req.body.students } });

    students.forEach((student) => {
      student.cMentor = mentor._id;
      student.save();
    });

    mentor.students = [
      ...mentor.students,
      ...students.map((student) => student._id),
    ];
    await mentor.save();
    res.send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Reassign a student to a different mentor
app.put("/student/:studentId/assignMentor/:mentorId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const newMentor = await Mentor.findById(req.params.mentorId);

    if (!student || !newMentor) {
      return res.status(404).json({ error: 'Student or Mentor not found' });
    }

    if (student.cMentor && student.cMentor.toString() === req.params.mentorId) {
      return res
        .status(400)
        .json({ error: 'Student is already assigned to this mentor' });
    }

    if (student.cMentor) {
      student.pMentor.push(student.cMentor);
      const previousMentor = await Mentor.findById(student.cMentor);
      if (previousMentor) {
        previousMentor.students.pull(student._id);
        await previousMentor.save();
      }
    }

    student.cMentor = newMentor._id;

    newMentor.students.push(student._id);

    await student.save();
    await newMentor.save();

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a list of students assigned to a mentor
app.get("/mentor/:mentorId/students", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate(
      "students"
    );
    res.send(mentor.students);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get the previous mentor of a student
app.get("/student/:studentId/pMentor", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "pMentor"
    );
    if (!student) {
      return res.status(404).json({ error: 'No previous Mentor Available' });
    } else {
      res.send(student.pMentor);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
})