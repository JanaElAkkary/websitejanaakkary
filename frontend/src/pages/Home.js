import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet, faCirclePlus, faHatChef } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

function Home() {
  const { isChef, user } = useAuth();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Crave and Create</h1>
      <div className="options-container">
        <Link to="/recipes" className="option-box">
          <FontAwesomeIcon icon={faKitchenSet} className="option-icon" />
          <div className="option-content">
            <h2>Browse Recipes</h2>
            <p>Explore our collection of delicious recipes</p>
          </div>
        </Link>
        
        {isChef() && (
          <Link to="/create-recipe" className="option-box">
            <FontAwesomeIcon icon={faCirclePlus} className="option-icon" />
            <div className="option-content">
              <h2>Create Recipe</h2>
              <p>Share your culinary creations with the world</p>
            </div>
          </Link>
        )}
      </div>

      {!user && (
        <div className="login-prompt">
          <FontAwesomeIcon icon={faKitchenSet} className="prompt-icon" />
          <p>Log in as a chef to create and share your own recipes!</p>
          <div className="prompt-buttons">
            <Link to="/login" className="prompt-button">Login</Link>
            <Link to="/register" className="prompt-button">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
