require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const expertRoutes = require('./routes/expertRoutes');
const majorRoutes = require('./routes/majorRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const optionRoutes = require('./routes/optionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const responseRoutes = require('./routes/responseRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const skillRoutes = require('./routes/skillRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');


app.use('/students', studentRoutes);
app.use('/', authRoutes);
app.use('/faculties', facultyRoutes);
app.use('/experts', expertRoutes);
app.use('/majors', majorRoutes);
app.use('/opportunities', opportunityRoutes);
app.use('/options', optionRoutes);
app.use('/questions', questionRoutes);
app.use('/responses', responseRoutes);
app.use('/submissions', submissionRoutes);
app.use('/skills', skillRoutes);
app.use('/submissions' , submissionRoutes)
app.use('/chatbot', chatbotRoutes);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});

/*
const db = require('./models');
const bcrypt = require('bcrypt');
const Admin = db.admin;

const createAdminUser = async () => {
    try {
        const adminData = {
            name: "Administrator",
            email: "admin@bousalaty.com",
            password: "Admin@12345",
            role: "admin"
        };

        const existingAdmin = await Admin.findOne({
            where: { email: adminData.email }
        });

        if (existingAdmin) {
            console.log("Admin already exists", adminData.email);
            return;
        }

        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        const newAdmin = await Admin.create({
            name: adminData.name,
            email: adminData.email,
            password: hashedPassword,
            role: adminData.role
        });

        console.log("Done");

    } catch (error) {
        console.error("error occured", error.message);
    } finally {
        process.exit(0);
    }
};

createAdminUser();
*/

