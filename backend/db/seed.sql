-- Insert sample users
INSERT INTO users (email, password, fullname, role) VALUES
('chef@example.com', '$2a$10$XgXB8mXEVx6A.nj0tGGqK.7nL6gX4TzPFyX5ZvzIZ3L6tZJ1vKj2', 'Master Chef', 'chef'),
('user@example.com', '$2a$10$XgXB8mXEVx6A.nj0tGGqK.7nL6gX4TzPFyX5ZvzIZ3L6tZJ1vKj2', 'Food Lover', 'user');

-- Insert sample recipes
INSERT INTO recipe (
    title, description, ingredients, instructions, prep_time, cook_time, 
    servings, category, image_url, chef_id, difficulty_level, cuisine_type, 
    dietary_restrictions, calories, protein, carbs, fats
) VALUES (
    'Classic Chocolate Cake',
    'A rich, moist chocolate cake that''s perfect for any occasion',
    'flour,sugar,cocoa powder,eggs,milk,butter,vanilla extract,baking powder,salt',
    'Preheat oven to 350°F\nMix dry ingredients\nCream butter and sugar\nAdd eggs and vanilla\nAlternate adding dry ingredients and milk\nBake for 30-35 minutes',
    20,
    35,
    12,
    'Desserts',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    1,
    'Medium',
    'American',
    'Contains gluten, dairy, eggs',
    350,
    5,
    45,
    15
),
(
    'Fresh Garden Salad',
    'A light and refreshing salad with seasonal vegetables',
    'mixed greens,cherry tomatoes,cucumber,red onion,olive oil,balsamic vinegar,salt,pepper',
    'Wash and chop all vegetables\nCombine in a large bowl\nWhisk together olive oil and vinegar\nToss with dressing\nSeason to taste',
    15,
    0,
    4,
    'Salads',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    1,
    'Easy',
    'Mediterranean',
    'Vegan, Gluten-free',
    120,
    3,
    12,
    8
);

-- Insert sample reviews
INSERT INTO reviews (recipe_id, user_id, rating, comment) VALUES
(1, 2, 5, 'This cake was amazing! So moist and chocolatey.'),
(1, 1, 4, 'Great recipe, but I reduced the sugar a bit.'),
(2, 2, 5, 'Perfect light lunch! Love the simplicity.');
