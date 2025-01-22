/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Hansol Nam Student ID: 113021190 Date: Jan 21. 2025
*  Vercel Link: _______________________________________________________________
*
********************************************************************************/ 

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const MoviesDB = require('./modules/moviesDB.js'); // Import the MoviesDB module

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

console.log("server.js")
// Initialize MoviesDB and connect to the database
const db = new MoviesDB();
db.initialize(process.env.MONGODB_CONN_STRING)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on: ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
// Routes

// Root route
app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

// POST /api/movies - Add a new movie
app.post('/api/movies', async (req, res) => {
    try {
        const newMovie = await db.addNewMovie(req.body);
        res.status(201).json(newMovie); // Status 201: Created
    } catch (error) {
        res.status(500).json({ error: error.message }); // Status 500: Server error
    }
});

// GET /api/movies - Get all movies with optional title filter and pagination
app.get('/api/movies', async (req, res) => {
    // const page=
    const { page, perPage, title } = req.query;

    try {
        const movies = await db.getAllMovies(page, perPage, title);

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Status 500: Server error
    }
});

// GET /api/movies/:id - Get a movie by ID
app.get('/api/movies/:id', async (req, res) => {
    try {
        const movie = await db.getMovieById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' }); // Status 404: Not found
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Status 500: Server error
    }
});

// PUT /api/movies/:id - Update a movie by ID
app.put('/api/movies/:id', async (req, res) => {
    try {
        const result = await db.updateMovieById(req.body, req.params.id);
        if (result.modifiedCount > 0) {
            res.status(204).end(); 
        } else {
            res.status(404).json({ error: 'Movie not found' }); // Status 404: Not found
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Status 500: Server error
    }
});

// DELETE /api/movies/:id - Delete a movie by ID
app.delete('/api/movies/:id', async (req, res) => {
    try {
        const result = await db.deleteMovieById(req.params.id);
        if (result.deletedCount > 0) {
            res.status(204).end(); // Status 204: No Content
        } else {
            res.status(404).json({ error: 'Movie not found' }); // Status 404: Not found
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Status 500: Server error
    }
});

// POST /data (Example Testing Route)
app.post('/data', (req, res) => {
    console.log(req.body); // Access parsed JSON from the request body
    res.json({ message: 'Data received', data: req.body });
});