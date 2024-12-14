const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../db');

const JWT_SECRET = 'your-secret-key';

// Register
router.post('/register', async (req, res) => {
    const { email, password, fullname, role = 'user' } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run(
            'INSERT INTO users (email, password, fullname, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, fullname, role]
        );

        const token = jwt.sign({ userId: result.lastID }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            success: true,
            user: { id: result.lastID, email, fullname, role },
            token
        });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

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

// Get user profile (protected)
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await db.get('SELECT id, email, fullname, role FROM users WHERE id = ?', [req.user.userId]);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Update user profile (protected)
router.put('/profile', auth, async (req, res) => {
    const { fullname, currentPassword, newPassword } = req.body;

    try {
        const user = await db.get('SELECT * FROM users WHERE id = ?', [req.user.userId]);
        
        if (newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, error: 'Current password is incorrect' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await db.run('UPDATE users SET fullname = ?, password = ? WHERE id = ?', [fullname, hashedPassword, req.user.userId]);
        } else {
            await db.run('UPDATE users SET fullname = ? WHERE id = ?', [fullname, req.user.userId]);
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;
