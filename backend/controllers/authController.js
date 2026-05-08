const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Student = db.student;
//register
const register = async (req, res) => {
    try {
        const { name, email, password, tawjihiGrade, studyTrack } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingStudent = await Student.findOne({
            where: { email }
        });

        if (existingStudent) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            tawjihiGrade,
            studyTrack
        });

        const token = jwt.sign(
            {
                studentID: student.studentID,
                email: student.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "Student registered successfully",
            token,
            student
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const student = await Student.findOne({
            where: { email }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                studentID: student.studentID,
                email: student.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: "Login successful",
            token,
            student
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login
};