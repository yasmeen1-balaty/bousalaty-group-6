const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Student = db.student;
const Admin = db.admin;
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
                email: student.email,
                role: 'student'

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
                email: student.email,
                role: 'student'
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: student.studentID,
                name: student.name,
                email: student.email,
                role: "student"
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const admin = await Admin.findOne({ where: { email } });
    console.log('Admin found:', admin ? admin.email : 'none');
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
        { adminID: admin.adminID, email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ message: "Login successful", token, admin });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // continue to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const accessAdminPanel = (req, res, next) => { // Middleware to check if user is admin
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. You are not an admin." });
    }
};

module.exports = {
    register,
    login,
    loginAdmin,
    verifyToken,
    accessAdminPanel
};