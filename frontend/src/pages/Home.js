import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faKitchenSet, 
  faCirclePlus, 
  faHatChef, 
  faUtensils, 
  faHeart, 
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

function Home() {
  const { isChef, user } = useAuth();

  return (
    <div className="home-container">
      {user && (
        <div className="user-welcome">
          <span>Welcome, {user.name}!</span>
        </div>
      )}
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

      <section className="about-section">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Welcome to Crave and Create, where passion for cooking meets creativity! We're more than
          just a recipe platform – we're a vibrant community of food lovers, home cooks, and
          professional chefs sharing their culinary adventures.
        </p>
        <p className="mission-statement">
          Our mission is to inspire and empower everyone to explore the joy of cooking, whether you're a
          beginner or an experienced chef.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faUtensils} />
            </div>
            <h3 className="feature-title">Diverse Recipes</h3>
            <p className="feature-description">
              Explore recipes from various cuisines and skill levels
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3 className="feature-title">Community</h3>
            <p className="feature-description">
              Share your passion for cooking with our growing community
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <h3 className="feature-title">Quality Content</h3>
            <p className="feature-description">
              Curated recipes with detailed instructions and tips
            </p>
          </div>
        </div>
      </section>

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
