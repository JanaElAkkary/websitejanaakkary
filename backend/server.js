const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 9999;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database(path.join(__dirname, '../db/recipes.db'), (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      fullname TEXT NOT NULL,
      role TEXT DEFAULT 'user' CHECK(role IN ('user', 'chef')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    // Create recipe table
    db.run(`CREATE TABLE IF NOT EXISTS recipe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      instructions TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Register endpoint
app.post('/user/register', async (req, res) => {
  const { email, password, fullname, role = 'user' } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const sql = 'INSERT INTO users (email, password, fullname, role) VALUES (?, ?, ?, ?)';
    db.run(sql, [email, hashedPassword, fullname, role], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ success: false, error: 'Email already registered' });
        }
        return res.status(500).json({ success: false, error: 'Error creating user' });
      }

      // Create JWT token
      const token = jwt.sign({ userId: this.lastID }, JWT_SECRET, { expiresIn: '24h' });

      res.status(201).json({
        success: true,
        user: {
          id: this.lastID,
          email,
          fullname,
          role
        },
        token
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Login endpoint
app.post('/user/login', (req, res) => {
  const { email, password } = req.body;

  // Find user
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    try {
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.role
        },
        token
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
});

// Get all recipes endpoint
app.get('/recipes', (req, res) => {
  db.all('SELECT * FROM recipe ORDER BY created_at DESC', [], (err, recipes) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      return res.status(500).json({ success: false, error: 'Failed to fetch recipes' });
    }
    res.json({ success: true, recipes });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
