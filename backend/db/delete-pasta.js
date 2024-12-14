const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'recipes.db'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Delete pasta recipe
const deleteQuery = `DELETE FROM recipe WHERE title = 'Classic Spaghetti Carbonara';`;

db.run(deleteQuery, (err) => {
    if (err) {
        console.error('Error deleting pasta recipe:', err);
    } else {
        console.log('Pasta recipe deleted successfully');
    }
    
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        }
        console.log('Database connection closed');
    });
});
