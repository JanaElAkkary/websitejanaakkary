const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'recipes.db');
const db = new sqlite3.Database(dbPath);

db.run('DELETE FROM recipe WHERE title = ?', ['2'], function(err) {
    if (err) {
        console.error('Error deleting recipe:', err);
    } else {
        console.log(`Recipe deleted successfully. Rows affected: ${this.changes}`);
    }
    db.close();
});
