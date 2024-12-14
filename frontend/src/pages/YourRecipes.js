
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:9999';

function YourRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchRecipes();
  }, [user]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/recipes/${user.id}`);
      setRecipes(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load your recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/recipe/${recipeId}?userId=${user.id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    } catch (err) {
      console.error('Error deleting recipe:', err);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Your Recipes</h1>
        <Link to="/create-recipe" className="btn btn-primary">
          <i className="bi bi-plus-lg"></i> Create New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center mt-5">
          <i className="bi bi-journal-x display-1 text-muted"></i>
          <h3 className="mt-3">No Recipes Yet</h3>
          <p className="text-muted">Start sharing your culinary creations with the world!</p>
          <Link to="/create-recipe" className="btn btn-primary mt-3">
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="col">
              <div className="card h-100 recipe-card">
                <img 
                  src={recipe.image_url || '/images/default-recipe.jpg'} 
                  className="card-img-top recipe-image" 
                  alt={recipe.title} 
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted small">
                    <i className="bi bi-clock me-1"></i>
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </p>
                  <p className="card-text">{recipe.description}</p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link 
                      to={`/recipe/${recipe.id}/edit`} 
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-pencil me-1"></i> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(recipe.id)} 
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourRecipes;