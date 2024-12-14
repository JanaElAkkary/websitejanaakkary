
-- Update Classic Chocolate Cake
UPDATE recipe SET
    description = 'A rich, moist chocolate cake with deep chocolate flavor and smooth, creamy frosting. Perfect for special occasions or whenever you need a decadent dessert.',
    ingredients = 'all-purpose flour,cocoa powder,baking powder,baking soda,salt,unsalted butter,granulated sugar,eggs,vanilla extract,buttermilk,hot coffee,dark chocolate,heavy cream',
    instructions = 'Preheat oven to 350°F (175°C)\nGrease and line two 9-inch cake pans\nSift together flour, cocoa, baking powder, baking soda, and salt\nCream butter and sugar until light and fluffy\nAdd eggs one at a time, then vanilla\nAlternate adding dry ingredients and buttermilk\nStir in hot coffee until smooth\nDivide batter between pans\nBake for 30-35 minutes\nCool completely before frosting\nFrost with chocolate ganache',
    prep_time = 30,
    cook_time = 35,
    servings = 12,
    calories = 380,
    protein = 5,
    carbs = 45,
    fats = 22,
    category = 'Dessert',
    image_url = '/images/delia-smiths-chocolate-cake.jpg'
WHERE title = 'Classic Chocolate Cake';

-- Update Fresh Garden Salad
UPDATE recipe SET
    description = 'A crisp and refreshing salad featuring mixed greens, cherry tomatoes, cucumber, and a light vinaigrette. Perfect as a side dish or light meal.',
    ingredients = 'mixed salad greens,cherry tomatoes,cucumber,red onion,bell peppers,carrots,olive oil,balsamic vinegar,Dijon mustard,honey,salt,black pepper,fresh herbs',
    instructions = 'Wash and dry all vegetables thoroughly\nChop lettuce into bite-sized pieces\nSlice cucumber and tomatoes\nThinly slice red onion\nJulienne carrots\nDice bell peppers\nWhisk together olive oil, vinegar, mustard, and honey\nSeason dressing with salt and pepper\nToss vegetables in a large bowl\nDrizzle with dressing just before serving\nGarnish with fresh herbs',
    prep_time = 15,
    cook_time = 0,
    servings = 4,
    calories = 120,
    protein = 3,
    carbs = 12,
    fats = 8,
    category = 'Salad',
    image_url = '/images/8-Grilled-Chicken-Caesar-Salad.jpg'
WHERE title = 'Fresh Garden Salad';

-- Update Grilled Salmon
UPDATE recipe SET
    description = 'Perfectly grilled salmon fillets with tender asparagus, seasoned with fresh herbs and lemon. A healthy and delicious meal rich in omega-3 fatty acids.',
    ingredients = 'fresh salmon fillets,asparagus spears,olive oil,fresh lemon,garlic cloves,fresh dill,sea salt,black pepper,butter,lemon zest',
    instructions = 'Preheat grill to medium-high heat (around 375°F)\nPat salmon fillets dry and season with salt and pepper\nMince garlic and chop fresh dill\nToss asparagus with olive oil, salt, and pepper\nRub salmon with olive oil and minced garlic\nPlace salmon skin-side down on the grill\nGrill for 4-5 minutes per side\nAdd asparagus to the grill for the last 3-4 minutes\nSqueeze fresh lemon juice over both\nGarnish with fresh dill and lemon zest',
    prep_time = 15,
    cook_time = 20,
    servings = 4,
    calories = 320,
    protein = 34,
    carbs = 8,
    fats = 18,
    category = 'Main Dish',
    image_url = '/images/2-Pan-Seared-Salmon-with-Lemon.jpg'
WHERE title = 'Grilled Salmon with Asparagus';

-- Update Breakfast Smoothie Bowl
UPDATE recipe SET
    description = 'A nutritious and Instagram-worthy smoothie bowl packed with antioxidants, protein, and healthy fats. Customize with your favorite toppings for a perfect breakfast.',
    ingredients = 'frozen mixed berries,frozen banana,Greek yogurt,almond milk,honey,granola,chia seeds,fresh strawberries,blueberries,sliced almonds,coconut flakes',
    instructions = 'Blend frozen berries, banana, yogurt, and almond milk until smooth\nAdd honey to taste\nPour into a serving bowl\nTop with fresh fruit\nSprinkle with granola\nAdd chia seeds\nFinish with sliced almonds and coconut flakes\nServe immediately while cold and fresh',
    prep_time = 10,
    cook_time = 0,
    servings = 1,
    calories = 280,
    protein = 12,
    carbs = 45,
    fats = 8,
    category = 'Breakfast',
    image_url = '/images/Smoothie-bowl-16df176.jpg'
WHERE title = 'Breakfast Smoothie Bowl';

-- Update Pizza Margherita
UPDATE recipe SET
    description = 'Classic Italian pizza with a crispy crust, fresh mozzarella, and aromatic basil. Made with simple, high-quality ingredients for an authentic taste of Naples.',
    ingredients = 'pizza dough,San Marzano tomatoes,fresh mozzarella,fresh basil leaves,extra virgin olive oil,sea salt,black pepper,garlic cloves,semolina flour',
    instructions = 'Preheat oven with pizza stone to 450°F\nStretch dough into a 12-inch circle\nDust pizza peel with semolina flour\nSpread crushed tomatoes leaving a border\nTear mozzarella into small pieces and distribute\nDrizzle with olive oil\nSeason with salt and pepper\nSlide onto hot stone\nBake for 12-15 minutes until crust is golden\nTop with fresh basil leaves\nDrizzle with more olive oil before serving',
    prep_time = 30,
    cook_time = 15,
    servings = 4,
    calories = 285,
    protein = 12,
    carbs = 38,
    fats = 10,
    category = 'Main Dish',
    image_url = '/images/frame-margherita-pizza-1.jpeg'
WHERE title = 'Homemade Pizza Margherita';

-- Update Quinoa Buddha Bowl
UPDATE recipe SET
    description = 'A nourishing bowl packed with quinoa, roasted vegetables, fresh greens, and a tahini dressing. Perfect for a healthy and satisfying meal.',
    ingredients = 'quinoa,sweet potato,chickpeas,kale,avocado,cherry tomatoes,red onion,tahini,lemon juice,olive oil,garlic,cumin,sea salt,black pepper',
    instructions = 'Cook quinoa according to package instructions\nPreheat oven to 400°F\nCube sweet potato and slice red onion\nToss vegetables with olive oil and seasonings\nRoast for 25-30 minutes\nDrain and rinse chickpeas\nWhisk together tahini, lemon juice, and garlic\nAssemble bowls with quinoa base\nTop with roasted vegetables and chickpeas\nAdd fresh kale and sliced avocado\nDrizzle with tahini dressing',
    prep_time = 20,
    cook_time = 30,
    servings = 4,
    calories = 420,
    protein = 15,
    carbs = 52,
    fats = 22,
    category = 'Main Dish',
    image_url = '/images/5-Quinoa-Buddha-Bowl.jpg'
WHERE title = 'Quinoa Buddha Bowl';