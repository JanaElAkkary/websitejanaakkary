import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetail from './pages/RecipeDetail';
import RecipeList from './pages/RecipeList';
import YourRecipes from './pages/YourRecipes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-recipe" element={<CreateRecipe />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/your-recipes" element={<YourRecipes />} />
    </Routes>
  );
};

export default AppRoutes;
