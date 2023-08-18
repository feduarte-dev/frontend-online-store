import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Carrinho from './components/Carrinho';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/carrinho" element={ <Carrinho /> } />
      <Route path="/produto/:productId" element={ <ProductDetails /> } />
    </Routes>
  );
}

export default App;
