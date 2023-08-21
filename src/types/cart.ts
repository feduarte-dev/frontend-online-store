export type CartType = {
  id: string,
  title : string,
  thumbnail: string,
  price: string,
  quantity: number,
  available_quantity: number,
  description?: string,
} | null;
