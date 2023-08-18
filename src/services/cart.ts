import { CartType } from '../types/cart';

if (!JSON.parse(localStorage.getItem('cartList') as string)) {
  localStorage.setItem('cartList', JSON.stringify([]));
}
export const readCartList = (): any[] => JSON.parse(
  localStorage.getItem('cartList') as string,
);

const saveCartList = (cartProduct: CartType[]) => localStorage
  .setItem('cartList', JSON.stringify(cartProduct));

export function saveItem({ id, price, thumbnail, title }: any) {
  const cartProduct = {
    id,
    price,
    thumbnail,
    title,
    quantity: 1,
  };
  const carrinho = readCartList();
  saveCartList([...carrinho, cartProduct]);
}

export const removeItem = ({ id }: any) => {
  const carrinho = readCartList();
  saveCartList(carrinho.filter((s) => s.id !== id));
};
export const increaseItem = ({ id }: any) => {
  const carrinho = readCartList();
  const updatedCart = carrinho
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  saveCartList(updatedCart);
};

export const decreaseItem = ({ id }: any) => {
  const carrinho = readCartList();
  const updatedCart = carrinho
    .map((item) => (item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 } : item));
  saveCartList(updatedCart);
};
