export async function getCategories() {
  const GETAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await GETAPI.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const GETAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const response = await GETAPI.json();
  return response.results;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
