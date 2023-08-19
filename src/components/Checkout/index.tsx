import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readCartList } from '../../services/cart';
import { FormType } from '../../types/checkout';

const initialState: FormType = {
  name: '',
  email: '',
  cpf: '',
  telefone: '',
  cep: '',
  endereço: '',
};

function Checkout() {
  const [form, setForm] = useState<FormType>(initialState);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const navigate = useNavigate();

  const handleForm = ({ target: { name, value } }:any) => {
    const formInput = {
      ...form,
      [name]: value,
    };
    setForm(formInput);
  };

  const handleClick = () => {
    if (
      !form.name
      || !form.email
      || !form.cpf
      || !form.telefone
      || !form.cep
      || !form.endereço
      || selectedPayment === ''
    ) {
      setIsVerified(true);
    } else {
      navigate('/');
      localStorage.setItem('cartList', JSON.stringify([]));
    }
  };

  return (
    <form>
      <label>
        Nome completo:
        <input
          data-testid="checkout-fullname"
          onChange={ handleForm }
          name="name"
          value={ form.name }
          required
        />
      </label>
      <label>
        E-mail:
        <input
          data-testid="checkout-email"
          onChange={ handleForm }
          name="email"
          value={ form.email }
          required
        />
      </label>
      <label>
        CPF
        <input
          data-testid="checkout-cpf"
          onChange={ handleForm }
          name="cpf"
          value={ form.cpf }
          required
        />
      </label>
      <label>
        Telefone:
        <input
          data-testid="checkout-phone"
          onChange={ handleForm }
          name="telefone"
          value={ form.telefone }
          required
        />
      </label>
      <label>
        CEP:
        <input
          data-testid="checkout-cep"
          onChange={ handleForm }
          name="cep"
          value={ form.cep }
          required
        />
      </label>
      <label>
        Endereço:
        <input
          data-testid="checkout-address"
          onChange={ handleForm }
          name="endereço"
          value={ form.endereço }
          required
        />
      </label>
      <div>
        <p>Método de pagamento:</p>

        <label>
          Boleto
          <input
            type="radio"
            name="payment"
            data-testid="ticket-payment"
            onChange={ (event) => setSelectedPayment(event.target.value) }
          />
        </label>
        <label>
          Visa
          <input
            type="radio"
            name="payment"
            data-testid="visa-payment"
            onChange={ (event) => setSelectedPayment(event.target.value) }
          />
        </label>
        <label>
          Master
          <input
            type="radio"
            name="payment"
            data-testid="master-payment"
            onChange={ (event) => setSelectedPayment(event.target.value) }
          />
        </label>
        <label>
          Elo
          <input
            type="radio"
            name="payment"
            data-testid="elo-payment"
            onChange={ (event) => setSelectedPayment(event.target.value) }
          />
        </label>
      </div>
      <button
        data-testid="checkout-btn"
        onClick={ handleClick }
      >
        Finalizar Compra
      </button>
      {isVerified && <p data-testid="error-msg">Campos inválidos</p>}
      {readCartList().map((product) => (
        <div key={ product.id }>
          <p>{ product.title }</p>
        </div>
      ))}

    </form>
  );
}

export default Checkout;
