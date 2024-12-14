import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/CreateRecipe.css';

function CreateRecipe() {
  const { user, isChef } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState({
    recipename: '',
    description: '',
    ingredients: '',
    instructions: '',
    timetoprepare: '',
    cooking_time: '',
    servings: '',
    cuisine: '',
    category: 'protein',
    difficulty: 'medium',
    dietary_details: '',
    image: null
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
          image: reader.result
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
      const formData = new FormData();
      Object.keys(recipeData).forEach(key => {
        formData.append(key, recipeData[key]);
      });
      formData.append('user_id', user.id);

      const response = await axios.post('/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        navigate('/recipes');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create recipe');
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
              <label>Recipe Name</label>
              <input
                type="text"
                name="recipename"
                value={recipeData.recipename}
                onChange={handleChange}
                required
                placeholder="Enter recipe name"
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
              <label>Cuisine</label>
              <select name="cuisine" value={recipeData.cuisine} onChange={handleChange} required>
                <option value="">Select cuisine</option>
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
                <option value="vegetables">Vegetables & Greens</option>
                <option value="healthy_fats">Healthy Fats</option>
                <option value="smoothies">Smoothies & Drinks</option>
                <option value="snacks">Healthy Snacks</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select name="difficulty" value={recipeData.difficulty} onChange={handleChange} required>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Dietary Details</label>
              <input
                type="text"
                name="dietary_details"
                value={recipeData.dietary_details}
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
                name="timetoprepare"
                value={recipeData.timetoprepare}
                onChange={handleChange}
                required
                placeholder="e.g., 30 minutes"
              />
            </div>

            <div className="form-group">
              <label>Cooking Time</label>
              <input
                type="text"
                name="cooking_time"
                value={recipeData.cooking_time}
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
                placeholder="Enter each ingredient on a new line with measurements (e.g., 2 cups flour)"
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

          {/* Image Upload */}
          <section className="form-section full-width">
            <h2>Recipe Image</h2>
            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              {recipeData.image && (
                <div className="image-preview">
                  <img src={recipeData.image} alt="Recipe preview" />
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
