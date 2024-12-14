const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Create a new database connection
const db = new sqlite3.Database(path.join(__dirname, 'recipes.db'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Read and execute schema.sql
const schemaSQL = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');

// Execute all statements in schema.sql
db.exec(schemaSQL, (err) => {
    if (err) {
        console.error('Error creating tables:', err);
        process.exit(1);
    }
    console.log('Database tables created successfully');
    
    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
            process.exit(1);
        }
        console.log('Database connection closed');
    });
});
