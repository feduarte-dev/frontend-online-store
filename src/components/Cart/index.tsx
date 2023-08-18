import { useState, useEffect } from 'react';
import { removeItem, increaseItem, decreaseItem } from '../../services/cart';
import { CartType } from '../../types/cart';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const [cartList, setCartList] = useState([]);

  const navigate = useNavigate();

  const getCart = () => JSON.parse(
    localStorage.getItem('cartList') as string,
  );

  useEffect(() => {
    function fetchCart() {
      const fetchCartList = getCart();
      setCartList(fetchCartList);
    }
    fetchCart();
  }, []);


  const handleDeleteBtn = (product: CartType) => {
    removeItem(product);
    setCartList(getCart());
  };

  const handleIncreaseBtn = (product: CartType) => {
    increaseItem(product);
    setCartList(getCart());
  };

  const handleDecreaseBtn = (product: CartType) => {
    decreaseItem(product);
    setCartList(getCart());
  };

  function handleFinalFormClick() {
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
                onClick={ () => handleDeleteBtn(product) }
              >
                x
              </button>
              <img src={ product.thumbnail } alt="productImage" />
              <p>{product.price}</p>
              <div>
                <button
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleDecreaseBtn(product) }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
                <button
                  data-testid="product-increase-quantity"
                  onClick={ () => handleIncreaseBtn(product) }
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
        onClick={ handleFinalFormClick }
      >
        Finalizar a compra
      </button>
    </div>
  );
}

export default Cart;
