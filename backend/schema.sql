DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    prep_time TEXT,
    cook_time TEXT,
    servings INTEGER,
    category TEXT,
    image_url TEXT,
    chef_id INTEGER,
    difficulty_level TEXT CHECK(difficulty_level IN ('easy', 'medium', 'hard', 'expert')),
    cuisine_type TEXT,
    dietary_restrictions TEXT,
    calories INTEGER,
    protein FLOAT,
    carbs FLOAT,
    fats FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chef_id) REFERENCES users(id)
);
