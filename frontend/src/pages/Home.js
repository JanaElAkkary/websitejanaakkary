import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

function Home() {
  const { isChef } = useAuth();

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
    </div>
  );
}

export default Home;
