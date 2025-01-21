require('dotenv').config();

const express = require  ('express');
const cors =require('cors');
const mongoose = require('mongoose');

const connectDB = async ()
//init express
const app = express (); 
//middleware
app.use(cors());
app.use(express.json());
//init MoviesDB instance and connect to DB
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
db.connect();


//get route
app.get('/', (req, res) => {
    res.json({ message: "API Listening"});
});

app.get('/movies', async (req, res) => {
    try {
        const movies = await db.getAllMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/data', (req, res) => {
    console.log(req.body); // Access parsed JSON from the request body
    res.json({ message: 'Data received', data: req.body });
});
//port
const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});