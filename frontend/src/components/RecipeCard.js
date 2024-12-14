
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClock, 
    faUtensils,
    faChartBar,
    faLeaf,
    faGlobe
} from '@fortawesome/free-solid-svg-icons';
import '../styles/RecipeCard.css';

function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    const handleViewRecipe = () => {
        navigate(`/recipe/${recipe.id}`);
    };

    const getTotalTime = () => {
        const total = (recipe.prep_time || 0) + (recipe.cook_time || 0);
        return total > 0 ? `${total} mins` : 'N/A';
    };

    const getDifficultyColor = () => {
        switch (recipe.difficulty_level?.toLowerCase()) {
            case 'easy': return 'var(--difficulty-easy)';
            case 'medium': return 'var(--difficulty-medium)';
            case 'hard': return 'var(--difficulty-hard)';
            case 'expert': return 'var(--difficulty-expert)';
            default: return 'var(--difficulty-medium)';
        }
    };

    return (
        <div className="recipe-card" onClick={handleViewRecipe}>
            <div className="recipe-image-container">
                <img 
                    src={recipe.image_url} 
                    alt={recipe.title} 
                    className="recipe-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-recipe.jpg';
                    }}
                />
                <div className="recipe-category">
                    <FontAwesomeIcon icon={faUtensils} />
                    {recipe.category}
                </div>
            </div>
            
            <div className="recipe-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                
                <div className="recipe-meta">
                    <div className="meta-item" title="Total Time">
                        <FontAwesomeIcon icon={faClock} />
                        <span>{getTotalTime()}</span>
                    </div>
                    <div 
                        className="meta-item difficulty" 
                        title="Difficulty Level"
                        style={{ '--difficulty-color': getDifficultyColor() }}
                    >
                        <FontAwesomeIcon icon={faChartBar} />
                        <span>{recipe.difficulty_level || 'Medium'}</span>
                    </div>
                </div>

                <p className="recipe-description">
                    {recipe.description?.length > 100 
                        ? `${recipe.description.substring(0, 100)}...` 
                        : recipe.description}
                </p>

                <div className="recipe-footer">
                    {recipe.dietary_restrictions && (
                        <div className="recipe-dietary" title="Dietary Info">
                            <FontAwesomeIcon icon={faLeaf} />
                            <span>{recipe.dietary_restrictions}</span>
                        </div>
                    )}
                    {recipe.cuisine_type && (
                        <div className="recipe-cuisine" title="Cuisine Type">
                            <FontAwesomeIcon icon={faGlobe} />
                            <span>{recipe.cuisine_type}</span>
                        </div>
                    )}
                </div>
                
                <button className="view-recipe-btn">
                    View Recipe
                </button>
            </div>
        </div>
    );
}

export default RecipeCard;