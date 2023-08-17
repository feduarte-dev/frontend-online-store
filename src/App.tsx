import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Carrinho from './components/Carrinho';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/carrinho" element={ <Carrinho /> } />
    </Routes>
  );
}

export default App;
