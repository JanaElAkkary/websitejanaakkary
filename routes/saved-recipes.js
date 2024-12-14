const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// Get user's saved recipes (protected)
router.get('/', auth, async (req, res) => {
    try {
        const savedRecipes = await db.all(
            `SELECT r.* 
             FROM recipe r 
             JOIN saved_recipes sr ON r.id = sr.recipe_id 
             WHERE sr.user_id = ? 
             ORDER BY sr.created_at DESC`,
            [req.user.userId]
        );
        res.json({ success: true, recipes: savedRecipes });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch saved recipes' });
    }
});

// Save a recipe (protected)
router.post('/:recipeId', auth, async (req, res) => {
    try {
        await db.run(
            'INSERT INTO saved_recipes (user_id, recipe_id) VALUES (?, ?)',
            [req.user.userId, req.params.recipeId]
        );
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ success: false, error: 'Recipe already saved' });
        }
        res.status(500).json({ success: false, error: 'Failed to save recipe' });
    }
});

// Unsave a recipe (protected)
router.delete('/:recipeId', auth, async (req, res) => {
    try {
        await db.run(
            'DELETE FROM saved_recipes WHERE user_id = ? AND recipe_id = ?',
            [req.user.userId, req.params.recipeId]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to unsave recipe' });
    }
});

module.exports = router;

