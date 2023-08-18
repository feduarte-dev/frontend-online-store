import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/cart" element={ <Cart /> } />
      <Route path="/product/:productId" element={ <ProductDetails /> } />
    </Routes>
  );
}

export default App;
