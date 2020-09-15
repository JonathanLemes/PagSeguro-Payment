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

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)