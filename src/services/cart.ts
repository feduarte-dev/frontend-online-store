if (!JSON.parse(localStorage.getItem('cartList') as string)) {
  localStorage.setItem('cartList', JSON.stringify([]));
}
const readCartList = (): any[] => JSON.parse(
  localStorage.getItem('cartList') as string,
);

const saveCartList = (cartProduct: any[]) => localStorage
  .setItem('cartList', JSON.stringify(cartProduct));

export function saveItem({ id, price, thumbnail, title }: any) {
  const cartProduct = {
    id,
    price,
    thumbnail,
    title,
  };
  const carrinho = readCartList();
  saveCartList([...carrinho, cartProduct]);
}
