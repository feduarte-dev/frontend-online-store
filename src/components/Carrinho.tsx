import React, { useState } from 'react';

function Carrinho() {
  const [carrinhoProdutos] = useState([]);
  const carrinhoVazio = carrinhoProdutos.length === 0;

  return (
    <div>
      {carrinhoVazio ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        <p>Carrinho com produtos, BRELEN</p>
      )}
    </div>
  );
}

export default Carrinho;
