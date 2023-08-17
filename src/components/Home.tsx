import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <label htmlFor="searchInput">
        <input type="text" placeholder="Pesquisar" name="searchInput" />
      </label>
      <div>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          <button>Carrinho</button>
        </Link>
      </div>
      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
    </>
  );
}
export default Home;
