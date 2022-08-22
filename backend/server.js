const express = require('express');
const colors = require('colors');
const recordRoutes = require('./routes/recordsRoute');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');

connectDB();

const app = express();

app.use(cors({
    origin: "*",
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/records', recordRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));