-- Drop existing tables if they exist
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS saved_recipes;

-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fullname TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK(role IN ('user', 'chef')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe table
CREATE TABLE recipe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    category TEXT,
    image_url TEXT,
    chef_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chef_id) REFERENCES users(id)
);

-- Reviews table
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Saved recipes table
CREATE TABLE saved_recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    UNIQUE(user_id, recipe_id)
);
