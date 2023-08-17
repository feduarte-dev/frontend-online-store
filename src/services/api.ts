export async function getCategories() {
  const GETAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await GETAPI.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const GETAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const response = await GETAPI.json();
  return response;
}

export async function getProductById(CATEGORY_ID: string) {
  const GETAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`);
  const response = await GETAPI.json();
  return response;
}
