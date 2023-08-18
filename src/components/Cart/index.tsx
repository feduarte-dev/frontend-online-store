import { useState, useEffect } from 'react';

function Cart() {
  const [carrinhoProdutos, setCarrinhoProdutos] = useState([]);

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
    </div>

  );
}

export default Cart;
