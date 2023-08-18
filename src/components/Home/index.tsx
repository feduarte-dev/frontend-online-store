import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import Aside from '../Aside';
import { saveItem } from '../../services/cart';

function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [products, setProducts] = useState<[]>([]);
  const navigate = useNavigate();

  function handleProductClick(productId: string) {
    navigate(`/product/${productId}`);
  }

  function handleInput(e:React.ChangeEvent<HTMLInputElement>):void {
    setInputValue(e.target.value);
  }

  async function handleSearchClick() {
    const GETAPI = await getProductsFromCategoryAndQuery(inputValue, inputValue);
    setProducts(GETAPI.results);
  }

  const handleCategoryClick = useCallback((filteredData: any) => {
    setProducts(filteredData);
  }, []);

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
      <button data-testid="query-button" onClick={ handleSearchClick }>Pesquisar</button>
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
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
            <>
              <div
                role="button"
                tabIndex={ 0 }
                key={ product.id }
                data-testid="product"
                onClick={ () => handleProductClick(product.id) }
                onKeyDown={ (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(product.id);
                  }
                } }
              >
                <p>{product.title}</p>
                <img src={ product.thumbnail } alt="productImage" />
                <p>{product.price}</p>
                <Link
                  to={ `/product${product.id}` }
                  data-testid="product-detail-link"
                >
                  Detalhes do Produto
                </Link>
              </div>
              <button
                data-testid="product-add-to-cart"
                onClick={ () => saveItem(product) }
              >
                Adicionar ao Carrinho
              </button>
            </>
          ))}
        </div>
      )}
      {products.length === 0 && (
        <h2>Nenhum produto foi encontrado</h2>
      )}
      <Aside onCategoryClick={ handleCategoryClick } />
    </>
  );
}
export default Home;
