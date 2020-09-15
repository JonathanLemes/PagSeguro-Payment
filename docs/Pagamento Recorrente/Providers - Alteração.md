# Providers - Alteração

## Edição de Valor e Planos
Para alterar o valor de um plano em sua conta PagSeguro, chame a função **editPlanValues(preApprovalRequestCode, amountPerPayment, updateSubscriptions)** da API, passando como parâmetros o preApprovalRequestCode, o amountPerPayment e o updateSubscriptions, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#edi%C3%A7%C3%A3o-de-valor-e-planos">Edição de Valor e Planos da API de Recorrência</a>.

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
         <td class="name"><code>preApprovalRequestCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código que retorna na chamada de Criação de plano</td>
      </tr>
      <tr>
         <td class="name"><code>amountPerPayment</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Novo valor para cobrança do plano e para as adesões do plano.</td>
      </tr>
      <tr>
         <td class="name"><code>updateSubscriptions</code></td>
         <td class="type">
            <span class="param-type">boolean</span>
         </td>
         <td class="description last">Flag para indicar se a alteração de valor deve afetar as adesões vigentes do plano.</td>
      </tr>
    </tbody>
</table>

---

## Desconto no pagamento
Para adicionar um desconto em um pagamento em sua conta PagSeguro, chame a função **paymentDiscount(preApprovalCode, type, value)** da API, passando como parâmetros o preApprovalCode, type e value, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#desconto-no-pagamento">Desconto no pagamento da API de Recorrência</a>.

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
         <td class="name"><code>preApprovalCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código de pre-approvals que retorna na Adesão do Plano</td>
      </tr>
      <tr>
         <td class="name"><code>type</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Tipo do desconto a ser aplicado</td>
      </tr>
      <tr>
         <td class="name"><code>value</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Valor do desconto a ser aplicado, de acordo com o tipo. Formato: Decimal, com duas casas decimais separadas por ponto, maior que 0.00 e deve ser compatível com o valor a ser descontado. Por exemplo: não é possível aplicar um desconto fixo de 11.00 para uma cobrança de 10.00, tal como não é possível informar uma porcentagem acima de 100.00.</td>
      </tr>
    </tbody>
</table>

---

## Mudança de meio de pagamento
Para alterar o meio de pagamento em sua conta PagSeguro, chame a função **changePaymentMethod(preApprovalCode, body)** da API, passando como parâmetros o preApprovalCodeo body estruturado conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#mudan%C3%A7a-de-meio-de-pagamento">Mudança de meio de pagamento da API de Recorrência</a>.

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
         <td class="name"><code>preApprovalCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código de pre-approvals que retorna na Adesão do Plano</td>
      </tr>
      <tr>
         <td class="name"><code>body.type*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Tipo do desconto a ser aplicado</td>
      </tr>
      <tr>
         <td class="name"><code>body.sender.ip</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Endereço de IP de origem da assinatura, relacionado ao assinante. Obrigatório se hash for nulo. Formato: 4 números, de 0 a 255, separados por ponto</td>
      </tr>
      <tr>
         <td class="name"><code>body.sender.hash</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Identificador (fingerprint) gerado pelo vendedor por meio do JavaScript do PagSeguro. Obrigatório se ip for nulo. Formato: Obtido a partir do método Javascript <a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-biblioteca-javascript">PagseguroDirectPayment.getSenderHash()</a></td>
      </tr>
      <tr>
         <td class="name"><code>body.creditCard.token*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Token retornado no método Javascript <a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-biblioteca-javascript">PagSeguroDirectPayment.createCardToken()</a>.</td>
      </tr>
      <tr>
         <td class="name"><code>body.creditCard.holder.name*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome conforme impresso no cartão de crédito. Formato: No mínimo 1 e no máximo 50 caracteres.</td>
      </tr>
      <tr>
         <td class="name"><code>body.creditCard.holder.birthDate*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Data de nascimento do dono do cartão de crédito. Formato: dd/MM/yyyy.</td>
      </tr>
      <tr>
         <td class="name"><code>body.creditCard.holder.documents.type*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Tipo de documento do comprador.</td>
      </tr>
      <tr>
         <td class="name"><code>body.creditCard.holder.phone.areaCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">DDD do comprador. Formato: Um número de 2 dígitos correspondente a um DDD válido.</td>
      </tr>
      <tr>
         <td class="name"><code>body.creditCard.holder.phone.number*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Número do telefone do comprador. Formato: Um número entre 7 e 9 dígitos.</td>
      </tr>
      <tr>
         <td class="name"><code>body.creditCard.holder.billingAddress.street*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome da rua. Formato: Livre, com limite de 80 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.creditCard.holder.billingAddress.complement*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Complemento (bloco, apartamento, etc.). Formato: Livre, com limite de 40 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.creditCard.holder.billingAddress.district*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Bairro. Formato: Livre, com limite de 60 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.creditCard.holder.billingAddress.city*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Cidade. Formato: Livre. Deve ser um nome válido de cidade do Brasil, com no mínimo 2 e no máximo 60 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.creditCard.holder.billingAddress.state*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Estado. Formato: Duas letras, representando a sigla do estado brasileiro correspondente.</td>
      </tr>
     <tr>
         <td class="name"><code>body.creditCard.holder.billingAddress.country*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">País.</td>
      </tr>
     <tr>
         <td class="name"><code>body.creditCard.holder.billingAddress.postalCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">CEP. Formato: Um número de 8 dígitos.</td>
      </tr>
    </tbody>
</table>

---

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)
