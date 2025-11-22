const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const Student = require("./models/Student");
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas ONLY
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI environment variable not set!");
    process.exit(1); // Stop the server if MONGO_URI is missing
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Stop the server if connection fails
    });

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend"))); 

const client = require('prom-client');
client.collectDefaultMetrics({ timeout: 5000 });

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Metrics route for Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// ================= CRUD API =================
app.post("/students", async (req, res) => {
    try {
        const { name, age, course } = req.body;
        if (!name || !age || !course) return res.status(400).json({ error: "All fields required" });

        const student = await Student.create({ name, age, course });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Not found" });
        res.json(student);
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
});

app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ error: "Not found" });
        res.json(student);
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted" });
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
});

// Serve index.html for root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
