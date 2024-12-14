const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'recipes.db'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Nutrition data for each recipe
const nutritionUpdates = [
    // Protein-Rich Recipes
    {
        title: 'Grilled Chicken Breast',
        calories: 165,
        protein: 31,
        carbs: 0,
        fats: 3.6
    },
    {
        title: 'Baked Salmon',
        calories: 206,
        protein: 22,
        carbs: 0,
        fats: 13
    },
    // Carbohydrate Recipes
    {
        title: 'Quinoa Power Bowl',
        calories: 420,
        protein: 15,
        carbs: 68,
        fats: 14
    },
    {
        title: 'Sweet Potato Mash',
        calories: 180,
        protein: 2,
        carbs: 41,
        fats: 0.3
    },
    // Vegetable Recipes
    {
        title: 'Mediterranean Salad',
        calories: 220,
        protein: 7,
        carbs: 12,
        fats: 18
    },
    {
        title: 'Roasted Vegetable Medley',
        calories: 120,
        protein: 4,
        carbs: 16,
        fats: 7
    },
    // Healthy Fats Recipes
    {
        title: 'Avocado Toast',
        calories: 290,
        protein: 8,
        carbs: 25,
        fats: 21
    },
    {
        title: 'Nuts and Seeds Mix',
        calories: 180,
        protein: 6,
        carbs: 8,
        fats: 15
    },
    // Smoothies & Drinks
    {
        title: 'Green Power Smoothie',
        calories: 245,
        protein: 8,
        carbs: 45,
        fats: 6
    },
    {
        title: 'Berry Blast Smoothie',
        calories: 210,
        protein: 10,
        carbs: 42,
        fats: 3
    },
    // Healthy Snacks
    {
        title: 'Energy Balls',
        calories: 120,
        protein: 4,
        carbs: 15,
        fats: 7
    },
    {
        title: 'Hummus with Veggie Sticks',
        calories: 190,
        protein: 8,
        carbs: 16,
        fats: 12
    }
];

// Update each recipe
let completed = 0;
nutritionUpdates.forEach(recipe => {
    const query = `
        UPDATE recipe 
        SET calories = ?, protein = ?, carbs = ?, fats = ?
        WHERE title = ?
    `;
    
    db.run(query, [
        recipe.calories,
        recipe.protein,
        recipe.carbs,
        recipe.fats,
        recipe.title
    ], (err) => {
        if (err) {
            console.error(`Error updating ${recipe.title}:`, err);
        } else {
            console.log(`Updated nutrition for: ${recipe.title}`);
        }
        
        completed++;
        if (completed === nutritionUpdates.length) {
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                }
                console.log('Database connection closed');
            });
        }
    });
});
