const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// Get reviews for a recipe
router.get('/recipe/:recipeId', async (req, res) => {
    try {
        const reviews = await db.all(
            `SELECT r.*, u.fullname 
             FROM reviews r 
             JOIN users u ON r.user_id = u.id 
             WHERE r.recipe_id = ? 
             ORDER BY r.created_at DESC`,
            [req.params.recipeId]
        );
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
    }
});

// Add a review (protected)
router.post('/', auth, async (req, res) => {
    const { recipe_id, rating, comment } = req.body;

    try {
        // Check if user already reviewed this recipe
        const existingReview = await db.get(
            'SELECT * FROM reviews WHERE recipe_id = ? AND user_id = ?',
            [recipe_id, req.user.userId]
        );

        if (existingReview) {
            return res.status(400).json({ success: false, error: 'You have already reviewed this recipe' });
        }

        const result = await db.run(
            'INSERT INTO reviews (recipe_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
            [recipe_id, req.user.userId, rating, comment]
        );

        res.status(201).json({ success: true, reviewId: result.lastID });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create review' });
    }
});

// Update a review (protected)
router.put('/:id', auth, async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const review = await db.get(
            'SELECT * FROM reviews WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );

        if (!review) {
            return res.status(404).json({ success: false, error: 'Review not found or unauthorized' });
        }

        await db.run(
            'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
            [rating, comment, req.params.id]
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update review' });
    }
});

// Delete a review (protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const review = await db.get(
            'SELECT * FROM reviews WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );

        if (!review) {
            return res.status(404).json({ success: false, error: 'Review not found or unauthorized' });
        }

        await db.run('DELETE FROM reviews WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete review' });
    }
});

module.exports = router;
