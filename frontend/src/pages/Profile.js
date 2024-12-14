import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Profile() {
  const { user, isChef } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('recipes');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [recipesRes, reviewsRes] = await Promise.all([
        axios.get(`/user/${user.id}/recipes`),
        axios.get(`/user/${user.id}/reviews`)
      ]);
      setRecipes(recipesRes.data);
      setReviews(reviewsRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  if (!user) return null;
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h3>{user.fullname}</h3>
              <p className="text-muted">
                {isChef() ? 'Professional Chef' : 'Food Enthusiast'}
              </p>
              <p className="mb-2">
                <i className="bi bi-envelope"></i> {user.email}
              </p>
              <p>
                <i className="bi bi-telephone"></i> {user.phonenumber}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'recipes' ? 'active' : ''}`}
                onClick={() => setActiveTab('recipes')}
              >
                {isChef() ? 'My Recipes' : 'Saved Recipes'}
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                My Reviews
              </button>
            </li>
          </ul>

          {activeTab === 'recipes' && (
            <div className="row">
              {recipes.map(recipe => (
                <div key={recipe.id} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <img
                      src={recipe.image || '/default-recipe.jpg'}
                      className="card-img-top"
                      alt={recipe.recipename}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.recipename}</h5>
                      <p className="card-text">
                        {recipe.description.substring(0, 100)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary">{recipe.category}</span>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => navigate(`/recipes/${recipe.id}`)}
                        >
                          View Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {recipes.length === 0 && (
                <div className="text-center">
                  <p>No recipes found.</p>
                  {isChef() && (
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate('/create-recipe')}
                    >
                      Create Your First Recipe
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {reviews.map(review => (
                <div key={review.id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href={`/recipes/${review.recipe_id}`}>
                        {review.recipe_name}
                      </a>
                    </h5>
                    <div className="mb-2 text-warning">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                    <p className="card-text">{review.review}</p>
                    <small className="text-muted">
                      {new Date(review.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-center">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
