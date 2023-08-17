function Home() {
  return (
    <>
      <label htmlFor="searchInput">
        <input type="text" placeholder="Pesquisar" name="searchInput" />
      </label>
      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
    </>
  );
}
export default Home;
