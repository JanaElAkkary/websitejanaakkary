const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all recipes
router.get('/', (req, res) => {
    const { search, category } = req.query;
    let query = `
        SELECT 
            r.*,
            u.fullname as chef_name,
            (SELECT COUNT(*) FROM reviews WHERE recipe_id = r.id) as review_count,
            (SELECT AVG(rating) FROM reviews WHERE recipe_id = r.id) as average_rating
        FROM recipe r 
        LEFT JOIN users u ON r.chef_id = u.id
    `;
    
    const params = [];
    if (search || category) {
        query += ' WHERE ';
        const conditions = [];
        
        if (search) {
            conditions.push('(r.title LIKE ? OR r.description LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }
        
        if (category) {
            conditions.push('r.category = ?');
            params.push(category);
        }
        
        query += conditions.join(' AND ');
    }
    
    query += ' ORDER BY r.created_at DESC';
    
    db.all(query, params, (err, recipes) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ error: 'Failed to fetch recipes' });
        }
        res.json({ recipes });
    });
});

// Get single recipe with all details
router.get('/:id', (req, res) => {
    const recipeId = req.params.id;
    const query = `
        SELECT 
            r.*,
            u.fullname as chef_name
        FROM recipe r
        LEFT JOIN users u ON r.chef_id = u.id
        WHERE r.id = ?
    `;
    
    db.get(query, [recipeId], (err, recipe) => {
        if (err) {
            console.error('Error fetching recipe:', err);
            return res.status(500).json({ error: 'Failed to fetch recipe' });
        }
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Parse ingredients and instructions if they're stored as strings
        if (recipe.ingredients && typeof recipe.ingredients === 'string') {
            recipe.ingredients = recipe.ingredients.split(',').map(i => i.trim());
        }
        
        if (recipe.instructions && typeof recipe.instructions === 'string') {
            recipe.instructions = recipe.instructions.split('\\n').filter(step => step.trim());
        }

        res.json({ recipe });
    });
});

// Create new recipe
router.post('/', (req, res) => {
    const {
        title,
        description,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        servings,
        category,
        image_url,
        chef_id,
        difficulty_level,
        cuisine_type,
        dietary_restrictions,
        calories,
        protein,
        carbs,
        fats
    } = req.body;

    const query = `
        INSERT INTO recipe (
            title, description, ingredients, instructions, 
            prep_time, cook_time, servings, category, 
            image_url, chef_id, difficulty_level, cuisine_type,
            dietary_restrictions, calories, protein, carbs, fats
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [
        title, description, ingredients, instructions,
        prep_time, cook_time, servings, category,
        image_url, chef_id, difficulty_level, cuisine_type,
        dietary_restrictions, calories, protein, carbs, fats
    ], function(err) {
        if (err) {
            console.error('Error creating recipe:', err);
            return res.status(500).json({ error: 'Failed to create recipe' });
        }
        res.status(201).json({ 
            message: 'Recipe created successfully',
            recipe_id: this.lastID
        });
    });
});

module.exports = router;
