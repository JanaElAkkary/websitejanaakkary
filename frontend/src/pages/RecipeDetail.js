import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faUtensils,
    faChartBar,
    faLeaf,
    faGlobe,
    faFire,
    faDumbbell,
    faBreadSlice,
    faOilCan
} from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';
import '../styles/RecipeDetail.css';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/recipes/${id}`);
                if (response.data && response.data.recipe) {
                    const recipeData = response.data.recipe;
                    
                    // Ensure ingredients and instructions are arrays
                    if (typeof recipeData.ingredients === 'string') {
                        recipeData.ingredients = recipeData.ingredients.split(',').map(i => i.trim());
                    } else if (!Array.isArray(recipeData.ingredients)) {
                        recipeData.ingredients = [];
                    }
                    
                    if (typeof recipeData.instructions === 'string') {
                        recipeData.instructions = recipeData.instructions.split('\\n').filter(step => step.trim());
                    } else if (!Array.isArray(recipeData.instructions)) {
                        recipeData.instructions = [];
                    }
                    
                    setRecipe(recipeData);
                } else {
                    throw new Error('Invalid recipe data received');
                }
                setError(null);
            } catch (err) {
                setError('Failed to fetch recipe details. Please try again later.');
                console.error('Error fetching recipe:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="recipe-detail-loading">
                <div className="loader"></div>
                <p>Loading recipe...</p>
            </div>
        );
    }

    if (error) {
        return <div className="recipe-detail-error">{error}</div>;
    }

    if (!recipe) {
        return <div className="recipe-detail-error">Recipe not found</div>;
    }

    return (
        <div className="recipe-detail-container">
            <div className="recipe-detail-header">
                <div className="recipe-header-content">
                    <h1 className="recipe-detail-title">{recipe.title}</h1>
                    <p className="recipe-detail-description">{recipe.description}</p>
                    
                    <div className="recipe-meta-info">
                        <div className="meta-item" title="Total Time">
                            <FontAwesomeIcon icon={faClock} />
                            <span>{(recipe.prep_time || 0) + (recipe.cook_time || 0)} mins</span>
                        </div>
                        <div className="meta-item">
                            <FontAwesomeIcon icon={faUtensils} />
                            <span>{recipe.category || 'Uncategorized'}</span>
                        </div>
                        <div className="meta-item">
                            <FontAwesomeIcon icon={faChartBar} />
                            <span>{recipe.difficulty_level || 'Medium'}</span>
                        </div>
                        {recipe.cuisine_type && (
                            <div className="meta-item">
                                <FontAwesomeIcon icon={faGlobe} />
                                <span>{recipe.cuisine_type}</span>
                            </div>
                        )}
                        {recipe.dietary_restrictions && (
                            <div className="meta-item">
                                <FontAwesomeIcon icon={faLeaf} />
                                <span>{recipe.dietary_restrictions}</span>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="recipe-image-wrapper">
                    <img 
                        src={recipe.image_url} 
                        alt={recipe.title}
                        className="recipe-detail-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/default-recipe.jpg';
                        }}
                    />
                </div>
            </div>

            <div className="recipe-detail-content">
                <div className="recipe-nutrition">
                    <h2>Nutrition Facts</h2>
                    <div className="nutrition-grid">
                        <div className="nutrition-item">
                            <FontAwesomeIcon icon={faFire} />
                            <span className="nutrition-value">{recipe.calories || 0}</span>
                            <span className="nutrition-label">Calories</span>
                        </div>
                        <div className="nutrition-item">
                            <FontAwesomeIcon icon={faDumbbell} />
                            <span className="nutrition-value">{recipe.protein || 0}g</span>
                            <span className="nutrition-label">Protein</span>
                        </div>
                        <div className="nutrition-item">
                            <FontAwesomeIcon icon={faBreadSlice} />
                            <span className="nutrition-value">{recipe.carbs || 0}g</span>
                            <span className="nutrition-label">Carbs</span>
                        </div>
                        <div className="nutrition-item">
                            <FontAwesomeIcon icon={faOilCan} />
                            <span className="nutrition-value">{recipe.fats || 0}g</span>
                            <span className="nutrition-label">Fats</span>
                        </div>
                    </div>
                </div>

                <div className="recipe-main-content">
                    <div className="recipe-ingredients">
                        <h2>Ingredients</h2>
                        <ul className="ingredients-list">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="ingredient-item">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="recipe-instructions">
                        <h2>Instructions</h2>
                        <ol className="instructions-list">
                            {recipe.instructions.map((step, index) => (
                                <li key={index} className="instruction-step">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;
