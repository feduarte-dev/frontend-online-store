import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [carrinhoProdutos, setCarrinhoProdutos] = useState([]);

  const navigate = useNavigate();

  const getCart = () => JSON.parse(
    localStorage.getItem('cartList') as string,
  );

  useEffect(() => {
    function carrinhoLista() {
      const allFavorites = getCart();
      setCarrinhoProdutos(allFavorites);
    }
    carrinhoLista();
  }, []);

  function handleFinalFormClick() {
    navigate('/checkout');
  }

  return (
    <div>
      {carrinhoProdutos.length > 0 && (
        <div>
          {carrinhoProdutos.map((product:
          { id:string, title: string, thumbnail: string, price: string }) => (
            <>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <img src={ product.thumbnail } alt="productImage" />
              <p>{product.price}</p>
            </>
          ))}
          <p data-testid="shopping-cart-product-quantity">
            Quantidade:
            {' '}
            {carrinhoProdutos.length}
          </p>
        </div>
      )}
      {carrinhoProdutos.length === 0 && (
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
