import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartType } from '../../types/cart';
import { EvaluationType } from '../../types/checkout';
import { saveItem, readCartList } from '../../services/cart';
import { getProductDetailsById } from '../../services/api';

const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const initialState: EvaluationType = {
  email: '',
  rating: '',
  text: '',
};

function ProductDetails() {
  const [product, setProduct] = useState<CartType | null>(null);
  const [form, setForm] = useState<EvaluationType>(initialState);
  const [evaluations, setEvaluations] = useState<EvaluationType[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [countCart, setCountCart] = useState<number>(readCartList().length);
  const { productId }: any = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductDetailsById(productId);
      setProduct(response);
      const storedEvaluations = JSON.parse(localStorage.getItem(productId) || '[]');
      setEvaluations(storedEvaluations);
    };
    fetchData();
  }, [productId]);

  const handleForm = (event:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    if (!form.email || !form.email.match(VALID_EMAIL_REGEX) || !form.rating) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
      const newEvaluations = [...evaluations, form];
      setEvaluations(newEvaluations);
      localStorage.setItem(productId, JSON.stringify(newEvaluations));
      setForm(initialState);
    }
  };

  const atualizaCountCart = () => {
    setCountCart(readCartList().length);
  };

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
          <h4 data-testid="shopping-cart-size">{countCart}</h4>
          <p>{ product.description }</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => {
          saveItem(product);
          atualizaCountCart();
        } }
      >
        Adicionar ao Carrinho
      </button>
      <form>
        <label>
          Email:
          <input
            type="email"
            data-testid="product-detail-email"
            name="email"
            onChange={ handleForm }
            value={ form.email }
          />
        </label>
        <div>
          <p>Avaliação</p>
          <label>
            1
            <input
              type="radio"
              name="rating"
              onChange={ handleForm }
              data-testid="1-rating"
              value="1"
            />
          </label>
          <label>
            2
            <input
              type="radio"
              name="rating"
              onChange={ handleForm }
              data-testid="2-rating"
              value="2"
            />
          </label>
          <label>
            3
            <input
              type="radio"
              name="rating"
              onChange={ handleForm }
              data-testid="3-rating"
              value="3"
            />
          </label>
          <label>
            4
            <input
              type="radio"
              name="rating"
              onChange={ handleForm }
              data-testid="4-rating"
              value="4"
            />
          </label>
          <label>
            5
            <input
              type="radio"
              name="rating"
              onChange={ handleForm }
              data-testid="5-rating"
              value="5"
            />
          </label>
        </div>
        <textarea
          data-testid="product-detail-evaluation"
          name="text"
          onChange={ handleForm }
          value={ form.text }
        />
        <button
          data-testid="submit-review-btn"
          onClick={ handleClick }
        >
          Enviar
        </button>
        {isVerified && <p data-testid="error-msg">Campos inválidos</p>}
      </form>
      <div>
        {evaluations.map((evaluation) => (
          <div key={ evaluation.text }>
            <h3 data-testid="review-card-email">{evaluation.email}</h3>
            <h4 data-testid="review-card-rating">{evaluation.rating}</h4>
            <p data-testid="review-card-evaluation">{evaluation.text}</p>
          </div>

        ))}

      </div>
    </div>
  );
}

export default ProductDetails;
