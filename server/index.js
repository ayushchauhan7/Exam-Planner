require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Classroom = require("./models/Classroom");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Replace with your Atlas URI)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// --- ROUTES ---

// 1. Add Classroom [cite: 24]
app.post("/api/classrooms", async (req, res) => {
  try {
    const newRoom = new Classroom(req.body);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. View All Classrooms [cite: 26]
app.get("/api/classrooms", async (req, res) => {
  try {
    // Sorting by floor for better readability in the list
    const rooms = await Classroom.find().sort({ floorNo: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Allocate Exam Seats [cite: 28]
app.post("/api/allocate", async (req, res) => {
  const { totalStudents } = req.body;
  let studentsRemaining = parseInt(totalStudents);

  try {
    // LOGIC: Greedy Allocation
    // Step 1: Fetch all rooms
    // Step 2: Sort by Floor (ASC) to prefer lower floors [cite: 31]
    // Step 3: Sort by Capacity (DESC) to use minimum number of rooms [cite: 30]
    const allRooms = await Classroom.find().sort({ floorNo: 1, capacity: -1 });

    const allocatedRooms = [];
    let totalCapacityAvailable = 0;

    for (const room of allRooms) {
      if (studentsRemaining <= 0) break;

      // Allocate this room
      allocatedRooms.push({
        ...room.toObject(),
        allocatedSeats: Math.min(room.capacity, studentsRemaining),
      });

      studentsRemaining -= room.capacity;
      totalCapacityAvailable += room.capacity;
    }

    // Handle Insufficient Capacity [cite: 33]
    if (studentsRemaining > 0) {
      return res.status(400).json({
        message: "Not enough seats available",
        shortage: studentsRemaining,
      });
    }

    res.json({ allocatedRooms, totalStudents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
