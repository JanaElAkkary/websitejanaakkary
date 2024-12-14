CREATE TABLE recipe (
    category TEXT,
    image_url TEXT,
    chef_id INTEGER,
    difficulty_level TEXT CHECK(difficulty_level IN ('Easy', 'Medium', 'Hard', 'Expert')),
    cuisine_type TEXT,
    dietary_restrictions TEXT,
    calories INTEGER,
    protein FLOAT,
    carbs FLOAT,
    fats FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chef_id) REFERENCES users(id)
);
