require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');



const studentRoutes = require('./routes/studentRoutes');
const resultRoutes = require('./routes/resultRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/students', studentRoutes);
app.use('/results', resultRoutes);
app.use('/', authRoutes);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});