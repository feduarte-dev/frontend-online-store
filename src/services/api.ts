export async function getCategories() {
  const GETAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await GETAPI.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryID: string, query: string) {
  const GETAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}_ID&q=${query}`);
  const response = await GETAPI.json();
  return response;
}

export async function getProductById(categoryID: string) {
  const GETAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}`);
  const response = await GETAPI.json();
  return response;
}

export async function getProductDetailsById(productID: string | undefined) {
  const GETAPI = await fetch(`https://api.mercadolibre.com/items/${productID}`);
  const response = await GETAPI.json();
  return response;
}
