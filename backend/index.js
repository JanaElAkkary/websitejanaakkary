const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Database configuration
const db = new sqlite3.Database(path.join(__dirname, '../recipes.db'), (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

app.use(cors());
app.use(express.json());

// Get all recipes
app.get('/api/recipes', (req, res) => {
  console.log('Received request for recipes');
  const { category, difficulty, search } = req.query;
  let query = 'SELECT * FROM recipe WHERE 1=1';
  const params = [];

  if (category) {
    params.push(category);
    query += ' AND category = ?';
  }

  if (difficulty) {
    params.push(difficulty);
    query += ' AND difficulty = ?';
  }

  if (search) {
    params.push(`%${search}%`);
    params.push(`%${search}%`);
    query += ' AND (title LIKE ? OR description LIKE ?)';
  }

  console.log('Executing query:', query, 'with params:', params);
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Found recipes:', rows);
    res.json(rows || []);
  });
});

// Get single recipe
app.get('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM recipe WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching recipe:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
