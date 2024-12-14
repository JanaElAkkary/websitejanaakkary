import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUtensils } from '@fortawesome/free-solid-svg-icons';
import RecipeCard from '../components/RecipeCard';
import api from '../services/api';
import '../styles/RecipeList.css';

function RecipeList() {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'protein', label: 'Protein-Rich' },
    { value: 'carbs', label: 'Carbohydrates' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'healthy_fats', label: 'Healthy Fats' },
    { value: 'smoothies', label: 'Smoothies & Drinks' },
    { value: 'snacks', label: 'Healthy Snacks' }
  ];

  useEffect(() => {
    fetchRecipes();
  }, [searchParams, selectedCategory]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError('');
      
      const searchQuery = searchParams.get('search');
      const response = await api.get('/recipes', { 
        params: {
          search: searchQuery,
          category: selectedCategory
        }
      });
      
      if (!response.data || !response.data.recipes) {
        throw new Error('Invalid response format from server');
      }

      setRecipes(response.data.recipes);
      setError('');
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err.response?.data?.error || 'Failed to fetch recipes. Please try again later.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">
          <FontAwesomeIcon icon={faUtensils} spin className="loading-icon" />
          <span>Loading recipes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-list-container">
      <div className="recipe-filters">
        <div className="filter-group">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {error ? (
        <div className="error-container">
          <div className="error">{error}</div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="no-recipes-container">
          <div className="no-recipes">
            <FontAwesomeIcon icon={faUtensils} className="no-recipes-icon" />
            <p>No recipes found.</p>
            <p className="no-recipes-hint">
              {selectedCategory ? 
                `Try selecting a different category or search term.` : 
                `Try a different search term.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
