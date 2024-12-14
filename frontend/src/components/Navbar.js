import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse,
  faKitchenSet,
  faCirclePlus,
  faMagnifyingGlass,
  faCircleUser,
  faRightFromBracket,
  faGear,
  faUtensils,
  faCaretDown,
  faEnvelope,
  faSpoon,
  faBowlRice,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout, isChef } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
    navigate(`/recipes?${params.toString()}`);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="brand">
            <div className="brand-logo">
              <FontAwesomeIcon icon={faBowlRice} className="brand-icon main-icon" />
              <FontAwesomeIcon icon={faUtensils} className="brand-icon secondary-icon" />
            </div>
            <span className="brand-text">Crave and Create</span>
          </Link>
        </div>
        
        <div className="navbar-center">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHouse} className="nav-icon" />
            Home
          </Link>
          <Link to="/recipes" className="nav-link">
            <FontAwesomeIcon icon={faKitchenSet} className="nav-icon" />
            Recipes
          </Link>
          {isChef() && (
            <Link to="/create-recipe" className="nav-link">
              <FontAwesomeIcon icon={faCirclePlus} className="nav-icon" />
              Create Recipe
            </Link>
          )}
          <form onSubmit={handleSearch} className="search-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="navbar-right">
          {user ? (
            <div className="user-menu" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="user-button">
                <div className="user-info-display">
                  <FontAwesomeIcon icon={faCircleUser} className="nav-icon" />
                  <span className="display-name">{user.name}</span>
                </div>
                <FontAwesomeIcon icon={faCaretDown} className="dropdown-caret" />
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="user-info">
                      <div className="user-avatar">
                        <FontAwesomeIcon icon={faCircleUser} className="avatar-icon" />
                      </div>
                      <div className="user-details">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                        {user.role === 'chef' && (
                          <span className="user-role">
                            <FontAwesomeIcon icon={faUtensils} className="role-icon" />
                            Chef
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  {user.role === 'chef' && (
                    <Link to="/create" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                      <FontAwesomeIcon icon={faCirclePlus} className="dropdown-icon" />
                      Add Recipe
                    </Link>
                  )}
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <FontAwesomeIcon icon={faCircleUser} className="dropdown-icon" />
                    Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <FontAwesomeIcon icon={faGear} className="dropdown-icon" />
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item">
                    <FontAwesomeIcon icon={faRightFromBracket} className="dropdown-icon" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon={faCircleUser} className="nav-icon" />
                Login
              </Link>
              <Link to="/register" className="nav-link">
                <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
