import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cart from '../Cart';
import { saveItem } from '../../services/cart';

interface Product {
  title: string,
  thumbnail: string,
  price: number,
  description: string,
}

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Deu erro ai dosido', error);
      }
    }
    fetchProductDetails();
  }, [productId]);
  return (
    <div>
      { product ? (
        <>
          <h2 data-testid="product-detail-name">{ product.title }</h2>
          <img
            src={ product.thumbnail }
            alt={ product.title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-price">{ `Preço: ${product.price}` }</p>
          <Link
            to="/cart"
          >
            <button data-testid="shopping-cart-button">Carrinho</button>
          </Link>
          <p>{ product.description }</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => saveItem(product) }
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductDetails;
