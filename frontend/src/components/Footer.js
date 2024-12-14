import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/custom.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: support@mealprep.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Meal Prep Street</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/recipes" className="text-white">Recipes</Link></li>
              <li><Link to="/create" className="text-white">Create Recipe</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>FAQ</h5>
            <ul className="list-unstyled">
              <li>How do I create a recipe?</li>
              <li>What makes a balanced meal?</li>
              <li>How to meal prep effectively?</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p>&copy; 2024 Meal Prep App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
