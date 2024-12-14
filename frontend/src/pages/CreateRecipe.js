import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';
import '../styles/CreateRecipe.css';

function CreateRecipe() {
  const { user, isChef } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    cuisine_type: '',
    category: 'protein',
    difficulty_level: 'medium',
    dietary_restrictions: '',
    image_url: null,
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  // Redirect if not a chef
  if (!isChef()) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeData(prev => ({
          ...prev,
          image_url: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Format the data
      const formattedData = {
        ...recipeData,
        chef_id: user.id,
        servings: parseInt(recipeData.servings),
        calories: parseInt(recipeData.calories),
        protein: parseFloat(recipeData.protein),
        carbs: parseFloat(recipeData.carbs),
        fats: parseFloat(recipeData.fats),
        // Keep ingredients and instructions as strings
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions
      };

      const response = await axios.post('/api/recipes', formattedData);
      
      if (response.data && response.data.recipe_id) {
        navigate('/recipes');
      } else {
        throw new Error('Failed to create recipe');
      }
    } catch (err) {
      console.error('Error creating recipe:', err);
      setError(err.response?.data?.error || err.message || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-recipe-container">
      <h1 className="page-title">Create New Recipe</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-grid">
          {/* Basic Information */}
          <section className="form-section">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Recipe Title</label>
              <input
                type="text"
                name="title"
                value={recipeData.title}
                onChange={handleChange}
                required
                placeholder="Enter recipe title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={recipeData.description}
                onChange={handleChange}
                required
                placeholder="Brief description of your recipe"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Cuisine Type</label>
              <select name="cuisine_type" value={recipeData.cuisine_type} onChange={handleChange} required>
                <option value="">Select cuisine type</option>
                <option value="American">American</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Indian">Indian</option>
                <option value="Japanese">Japanese</option>
                <option value="Mexican">Mexican</option>
                <option value="Thai">Thai</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="French">French</option>
                <option value="Greek">Greek</option>
                <option value="Spanish">Spanish</option>
                <option value="Korean">Korean</option>
                <option value="Vietnamese">Vietnamese</option>
              </select>
            </div>
          </section>

          {/* Recipe Details */}
          <section className="form-section">
            <h2>Recipe Details</h2>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={recipeData.category} onChange={handleChange} required>
                <option value="">Select category</option>
                <option value="protein">Protein-Rich</option>
                <option value="carbs">Carbohydrates</option>
                <option value="vegetables">Vegetables</option>
                <option value="healthy_fats">Healthy Fats</option>
                <option value="smoothies">Smoothies & Drinks</option>
                <option value="snacks">Healthy Snacks</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty Level</label>
              <select name="difficulty_level" value={recipeData.difficulty_level} onChange={handleChange} required>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Dietary Restrictions</label>
              <input
                type="text"
                name="dietary_restrictions"
                value={recipeData.dietary_restrictions}
                onChange={handleChange}
                placeholder="e.g., Vegetarian, Gluten-free, etc."
              />
            </div>
          </section>

          {/* Time and Servings */}
          <section className="form-section">
            <h2>Time and Servings</h2>
            <div className="form-group">
              <label>Preparation Time</label>
              <input
                type="text"
                name="prep_time"
                value={recipeData.prep_time}
                onChange={handleChange}
                required
                placeholder="e.g., 30 minutes"
              />
            </div>

            <div className="form-group">
              <label>Cooking Time</label>
              <input
                type="text"
                name="cook_time"
                value={recipeData.cook_time}
                onChange={handleChange}
                required
                placeholder="e.g., 1 hour"
              />
            </div>

            <div className="form-group">
              <label>Servings</label>
              <input
                type="number"
                name="servings"
                value={recipeData.servings}
                onChange={handleChange}
                required
                placeholder="Number of servings"
                min="1"
              />
            </div>
          </section>

          {/* Ingredients and Instructions */}
          <section className="form-section full-width">
            <h2>Recipe Content</h2>
            <div className="form-group">
              <label>Ingredients</label>
              <textarea
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleChange}
                required
                placeholder="Enter each ingredient separated by commas (e.g., 2 cups flour, 1 cup sugar)"
                rows="6"
              />
            </div>

            <div className="form-group">
              <label>Instructions</label>
              <textarea
                name="instructions"
                value={recipeData.instructions}
                onChange={handleChange}
                required
                placeholder="Enter step-by-step instructions, each step on a new line"
                rows="8"
              />
            </div>
          </section>

          {/* Nutrition Information */}
          <section className="form-section full-width">
            <h2>Nutrition Information</h2>
            <div className="form-group">
              <label>Calories</label>
              <input
                type="number"
                name="calories"
                value={recipeData.calories}
                onChange={handleChange}
                required
                placeholder="Enter calories per serving"
              />
            </div>

            <div className="form-group">
              <label>Protein</label>
              <input
                type="number"
                name="protein"
                value={recipeData.protein}
                onChange={handleChange}
                required
                placeholder="Enter protein per serving (in grams)"
              />
            </div>

            <div className="form-group">
              <label>Carbohydrates</label>
              <input
                type="number"
                name="carbs"
                value={recipeData.carbs}
                onChange={handleChange}
                required
                placeholder="Enter carbohydrates per serving (in grams)"
              />
            </div>

            <div className="form-group">
              <label>Fats</label>
              <input
                type="number"
                name="fats"
                value={recipeData.fats}
                onChange={handleChange}
                required
                placeholder="Enter fats per serving (in grams)"
              />
            </div>
          </section>

          {/* Image Upload */}
          <section className="form-section full-width">
            <h2>Recipe Image</h2>
            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                name="image_url"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              {recipeData.image_url && (
                <div className="image-preview">
                  <img src={recipeData.image_url} alt="Recipe preview" />
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => navigate('/recipes')}>
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating Recipe...' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;
