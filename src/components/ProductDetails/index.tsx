import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { saveItem } from '../../services/cart';
import { CartType } from '../../types/cart';
import { getProductDetailsById } from '../../services/api';

function ProductDetails() {
  const [product, setProduct] = useState<CartType >(null);
  const { productId } = useParams();

  useEffect(() => {
    const GETAPI = async () => {
      const response = await getProductDetailsById(productId);
      setProduct(response);
    };
    GETAPI();
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
