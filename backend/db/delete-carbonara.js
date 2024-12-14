const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'recipes.db'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Delete pasta carbonara recipe
const deleteQuery = `DELETE FROM recipe WHERE title LIKE '%Carbonara%' OR title LIKE '%Pasta%';`;

db.run(deleteQuery, (err) => {
    if (err) {
        console.error('Error deleting carbonara recipe:', err);
    } else {
        console.log('Carbonara recipe deleted successfully');
    }
    
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        }
        console.log('Database connection closed');
    });
});
