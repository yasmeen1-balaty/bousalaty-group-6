require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');



const studentRoutes = require('./routes/studentRoutes');
const resultRoutes = require('./routes/resultRoutes');
const authRoutes = require('./routes/authRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const expertRoutes = require('./routes/expertRoutes');
const majorRoutes = require('./routes/majorRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const optionRoutes = require('./routes/optionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const responseRoutes = require('./routes/responseRoutes');
const skillRoutes = require('./routes/skillRoutes');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/students', studentRoutes);
app.use('/results', resultRoutes);
app.use('/', authRoutes);
app.use('/faculties', facultyRoutes);
app.use('/experts', expertRoutes);
app.use('/majors', majorRoutes);
app.use('/opportunities', opportunityRoutes);
app.use('/options', optionRoutes);
app.use('/questions', questionRoutes);
app.use('/responses', responseRoutes);
app.use('/skills', skillRoutes);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
