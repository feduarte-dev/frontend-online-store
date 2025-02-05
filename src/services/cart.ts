import { CartType } from '../types/cart';

if (!JSON.parse(localStorage.getItem('cartList') as string)) {
  localStorage.setItem('cartList', JSON.stringify([]));
}

const saveCartList = (cartProduct: CartType[]) => localStorage
  .setItem('cartList', JSON.stringify(cartProduct));

export const readCartList = (): any[] | never[] => JSON.parse(
  localStorage.getItem('cartList') as string,
);

export function saveItem({ id, price, thumbnail, title, available_quantity }: any) {
  const cartProduct = {
    id,
    price,
    thumbnail,
    title,
    quantity: 1,
    available_quantity,
  };
  const carrinho = readCartList();
  saveCartList([...carrinho, cartProduct]);
}

export const removeItem = ({ id }: any) => {
  const carrinho = readCartList();
  saveCartList(carrinho.filter((s) => s.id !== id));
};

export const increaseItem = ({ id, available_quantity }: any) => {
  const carrinho = readCartList();
  const updatedCart = carrinho
    .map((item) => (item.id === id && item.quantity < available_quantity
      ? { ...item, quantity: item.quantity + 1 } : item));
  saveCartList(updatedCart);
};

export const decreaseItem = ({ id }: any) => {
  const carrinho = readCartList();
  const updatedCart = carrinho
    .map((item) => (item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 } : item));
  saveCartList(updatedCart);
};
