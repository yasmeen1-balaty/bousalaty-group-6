const express = require('express');
const app = express();

const studentRoutes = require('./routes/studentRoutes');
const resultRoutes = require('./routes/resultRoutes');


app.use(express.json());
app.use('/students', studentRoutes);
app.use('/results', resultRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});