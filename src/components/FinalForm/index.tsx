import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readCartList } from '../../services/cart';

type FormType = {
  name: string,
  email: string,
  cpf: string,
  telefone: string,
  cep: string,
  endereço: string
};

const initialState = {
  name: '',
  email: '',
  cpf: '',
  telefone: '',
  cep: '',
  endereço: '',
};

function FinalForm() {
  const [form, setForm] = useState<FormType>(initialState);
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState('Campos inválidos');

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
    ) {
      // setMessage('Campos inválidos');
      setSubmit(true);
    } else {
      setMessage('');
      navigate('/');
      localStorage.setItem('cartList', JSON.stringify([]));
    }
  };

  return (
    <div>
      <label>
        <input
          data-testid="checkout-fullname"
          onChange={ handleForm }
          name="name"
          value={ form.name }
          required
        />

        Nome completo:
      </label>
      <label>
        <input
          data-testid="checkout-email"
          onChange={ handleForm }
          name="email"
          value={ form.email }
          required
        />
        E-mail:
      </label>
      <label>
        <input
          data-testid="checkout-cpf"
          onChange={ handleForm }
          name="cpf"
          value={ form.cpf }
          required
        />
        CPF
      </label>
      <label>
        <input
          data-testid="checkout-phone"
          onChange={ handleForm }
          name="telefone"
          value={ form.telefone }
          required
        />
        Telefone:
      </label>
      <label>
        <input
          data-testid="checkout-cep"
          onChange={ handleForm }
          name="cep"
          required
        />
        CEP:
      </label>
      <label>
        <input
          data-testid="checkout-address"
          onChange={ handleForm }
          name="endereço"
          value={ form.endereço }
          required
        />
        Endereço:
      </label>
      <label>
        <input
          type="radio"
          name="Boleto"
          data-testid="ticket-payment"
          onChange={ handleForm }
        />
        <input
          type="radio"
          name="Visa"
          data-testid="visa-payment"
        />
        <input
          type="radio"
          name="Master Card"
          data-testid="master-payment"
        />
        <input
          type="radio"
          name="Elo"
          data-testid="elo-payment"
        />
        Método de pagamento:
      </label>
      <button
        data-testid="checkout-btn"
        onClick={ handleClick }
      >
        Enviar formulário
      </button>
      {submit && <p data-testid="error-msg">{message}</p>}
      {readCartList().map((product) => (
        <p key={ product.id }>{ product.title }</p>
      ))}
    </div>
  );
}

export default FinalForm;
