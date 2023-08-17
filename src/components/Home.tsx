import { useState } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { Link } from 'react-router-dom';

function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [products, setProducts] = useState<[]>([]);

  function handleInput(e:React.ChangeEvent<HTMLInputElement>):void {
    setInputValue(e.target.value);
  }

  async function handleButton() {
    setProducts(await getProductsFromCategoryAndQuery(inputValue, inputValue));
  }

  return (
    <>
      <label htmlFor="searchInput">
        <input
          type="text"
          name="searchInput"
          data-testid="query-input"
          value={ inputValue }
          onChange={ handleInput }
        />
      </label>
      <button data-testid="query-button" onClick={ handleButton }>Pesquisar</button>
      <div>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          <button>Carrinho</button>
        </Link>
      </div>

      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
      {products.length > 0 && (
        <div>
          {products.map((product:
          { id:string, title: string, thumbnail: string, price: string }) => (
            <div
              key={ product.id }
              data-testid="product"
            >
              <p>{product.title}</p>
              <img src={ product.thumbnail } alt="productImage" />
              <p>{product.price}</p>
            </div>

          ))}
        </div>
      )}
      {products.length === 0 && (
        <h2>Nenhum produto foi encontrado</h2>
      )}
    </>
  );
}
export default Home;
