# Processando o Checkout

## Boleto, Cartão de Débito e Cartão de Crédito
O Checkout Transparente é realizado através da função **transparentCheckout(body)**. O parâmetro body varia de acordo com as três opções disponibilizadas pelo PagSeguro (<a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-boleto">Boleto</a>, <a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-debito-online">Cartão de Débito</a> e <a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-cartao-de-credito">Cartão de Crédito</a>).

## Cancelar transação
Para cancelar a uma transação com status "Aguardando pagamento" ou "Em análise", chame a função **transparentCheckoutCancel(transactionCode)**.

### Parâmetros
<table class="params">
   <thead>
      <tr>
         <th>Variável</th>
         <th>Tipo</th>
         <th class="last">Descrição</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td class="name"><code>transactionCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código da transação. Transação deverá estar com os status Aguardando pagamento ou Em análise. Formato: Uma sequência de 36 caracteres, com os hífens, ou 32 caracteres, sem os hífens.</td>
      </tr>
    </tbody>
</table>

## Estornar transação
Para estornar a uma transação com status "Paga", "Disponível" ou "Em disputa", chame a função **transparentCheckoutRefund(transactionCode, refundValue)**.

### Parâmetros
<table class="params">
   <thead>
      <tr>
         <th>Variável</th>
         <th>Tipo</th>
         <th class="last">Descrição</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td class="name"><code>transactionCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código da transação. Transação deverá estar com os status "Paga", "Disponível" ou "Em disputa". Formato: Uma sequência de 36 caracteres, com os hífens, ou 32 caracteres, sem os hífens.</td>
      </tr>
      <tr>
         <td class="name"><code>refundValue*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Valor do estorno. Utilizado no estorno de uma transação, corresponde ao valor a ser devolvido. Se não for informado, o PagSeguro assume que o valor a ser estornado é o valor total da transação. Formato: Decimal, com duas casas decimais separadas por ponto (p.e., 1234.56), maior que 0.00 e menor ou igual ao valor da transação.</td>
      </tr>
    </tbody>
</table>

---

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)