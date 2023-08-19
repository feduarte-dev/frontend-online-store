import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeItem, increaseItem, decreaseItem } from '../../services/cart';
import { CartType } from '../../types/cart';

function Cart() {
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();

  const getCart = () => JSON.parse(
    localStorage.getItem('cartList') as string,
  );

  useEffect(() => {
    function fetchCart() {
      const cart = getCart();
      setCartList(cart);
    }
    fetchCart();
  }, []);

  const updateCartAndState = () => {
    const updatedCart = getCart();
    setCartList(updatedCart);
  };

  const handleAction = (product
  : CartType, action: 'increase' | 'decrease' | 'remove') => {
    switch (action) {
      case 'increase':
        increaseItem(product);
        break;
      case 'decrease':
        decreaseItem(product);
        break;
      case 'remove':
        removeItem(product);
        break;
      default:
        break;
    }
    updateCartAndState();
  };

  function handleCheckout() {
    navigate('/checkout');
  }

  return (
    <div>
      {cartList.length > 0 && (
        <div>
          {cartList.map((product:{ id:string, title
          : string, thumbnail: string, price: string, quantity: number }) => (
            <>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <button
                data-testid="remove-product"
                onClick={ () => handleAction(product, 'remove') }
              >
                x
              </button>
              <img src={ product.thumbnail } alt="productImage" />
              <p>{product.price}</p>
              <div>
                <button
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleAction(product, 'decrease') }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
                <button
                  data-testid="product-increase-quantity"
                  onClick={ () => handleAction(product, 'increase') }
                >
                  +
                </button>
              </div>
            </>
          ))}
          <p>{`Quantidade: ${cartList.length}`}</p>
        </div>
      )}
      {cartList.length === 0 && (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
      <button
        data-testid="checkout-products"
        onClick={ handleCheckout }
      >
        Finalizar a compra
      </button>
    </div>
  );
}

export default Cart;
