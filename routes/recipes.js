const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// Get all recipes with optional filters
router.get('/', async (req, res) => {
    const { category, difficulty, search } = req.query;
    let query = 'SELECT * FROM recipe WHERE 1=1';
    const params = [];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    if (difficulty) {
        query += ' AND difficulty = ?';
        params.push(difficulty);
    }

    if (search) {
        query += ' AND (title LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    try {
        const recipes = await db.all(query, params);
        res.json({ success: true, recipes });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch recipes' });
    }
});

// Get single recipe
router.get('/:id', async (req, res) => {
    try {
        const recipe = await db.get('SELECT * FROM recipe WHERE id = ?', [req.params.id]);
        if (!recipe) {
            return res.status(404).json({ success: false, error: 'Recipe not found' });
        }
        res.json({ success: true, recipe });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch recipe' });
    }
});

// Create recipe (protected route)
router.post('/', auth, async (req, res) => {
    const { title, description, ingredients, instructions, prep_time, cook_time, servings, category, image_url } = req.body;
    
    try {
        const result = await db.run(
            'INSERT INTO recipe (title, description, ingredients, instructions, prep_time, cook_time, servings, category, image_url, chef_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, ingredients, instructions, prep_time, cook_time, servings, category, image_url, req.user.userId]
        );
        res.status(201).json({ success: true, recipeId: result.lastID });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create recipe' });
    }
});

// Update recipe (protected route)
router.put('/:id', auth, async (req, res) => {
    const { title, description, ingredients, instructions, prep_time, cook_time, servings, category, image_url } = req.body;
    
    try {
        const recipe = await db.get('SELECT * FROM recipe WHERE id = ? AND chef_id = ?', [req.params.id, req.user.userId]);
        if (!recipe) {
            return res.status(404).json({ success: false, error: 'Recipe not found or unauthorized' });
        }

        await db.run(
            'UPDATE recipe SET title = ?, description = ?, ingredients = ?, instructions = ?, prep_time = ?, cook_time = ?, servings = ?, category = ?, image_url = ? WHERE id = ?',
            [title, description, ingredients, instructions, prep_time, cook_time, servings, category, image_url, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update recipe' });
    }
});

// Delete recipe (protected route)
router.delete('/:id', auth, async (req, res) => {
    try {
        const recipe = await db.get('SELECT * FROM recipe WHERE id = ? AND chef_id = ?', [req.params.id, req.user.userId]);
        if (!recipe) {
            return res.status(404).json({ success: false, error: 'Recipe not found or unauthorized' });
        }

        await db.run('DELETE FROM recipe WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete recipe' });
    }
});

module.exports = router;
