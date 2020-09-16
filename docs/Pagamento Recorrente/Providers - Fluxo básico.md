# Providers - Fluxo básico

## Criar Plano
Para criar um novo plano em sua conta PagSeguro, chame a função **createPlan(body)** da API, passando como parâmetro um JSON estruturado conforme o parâmetro Body em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#criar-plano">Criar Plano da API de Recorrência</a>.
```javascript
var body = {
    reference: "1", 
    preApproval: {
        name: "Teste01", 
        charge: "MANUAL", 
        period: "MONTHLY", 
        expiration: {
            value: 10, 
            unit: "YEARS"
        }
    }
}

pagseguroPayment.createPlan(body).then((res) => {
    console.log(res);
});
```

### Possíveis parâmetros do Body:
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
         <td class="name"><code>redirectUrl</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">URL para onde o assinante será redirecionado após a finalização do fluxo de pagamento. Este valor somente será utilizado caso queira utilizar este plano em um Pagamento Recorrente via botão.</td>
      </tr>
      <tr>
         <td class="name"><code>reference*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código/Identificador para fazer referência a assinatura em seu sistema.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.name*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome/Identificador do plano. Formato: Livre, com limite de 100 caracteres.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.charge*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Indica o modelo de cobrança do pagamento recorrente. Use AUTO para o modelo pré-pago e MANUAL para o modelo pós-pago.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.period*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Periodicidade da cobrança.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.amountPerPayment</code></td>
         <td class="type">
            <span class="param-type">double</span>
         </td>
         <td class="description last">Valor exato de cada cobrança. Obrigatório para o modelo AUTO. Formato: Decimal, com duas casas decimais separadas por ponto (p.e, 1234.56). Deve ser um valor maior ou igual a 1.00 e menor ou igual a 2000.00.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.membershipFee</code></td>
         <td class="type">
            <span class="param-type">double</span>
         </td>
         <td class="description last">Valor da taxa de adesão. Sempre será cobrada juntamente com a primeira parcela do pagamento, independente se o plano é pré-pago ou pós-pago. Formato: Decimal, com duas casas decimais separadas por ponto (p.e, 1234.56), maior ou igual a 0.00 e menor ou igual a 1000000.00.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.trialPeriodDuration</code></td>
         <td class="type">
            <span class="param-type">int</span>
         </td>
         <td class="description last">Período de teste, em dias. A recorrência mantém o status INITIATED durante o período de testes, de modo que a primeira cobrança só ocorrerá após esse período, permitindo que a recorrência mude para ACTIVE. No caso de pagamento pré-pago, a cobrança se dá imediatamente após o fim do período de testes; no caso de pagamento pós-pago, a cobrança ocorre após o período de cobrança somado ao período de testes. Formato: Inteiro, maior ou igual a 1 e menor ou igual a 1000000.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.expiration.value*</code></td>
         <td class="type">
            <span class="param-type">int</span>
         </td>
         <td class="description last">Um número inteiro maior ou igual a 1 e menor ou igual a 1000000.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.expiration.unit*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Combine com value para obter a duração da recorrência, ex: 2 YEARS.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.details</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Descrição do plano.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.maxAmountPerPeriod</code></td>
         <td class="type">
            <span class="param-type">double</span>
         </td>
         <td class="description last">Valor máximo que pode ser cobrado por mês de vigência da assinatura, independente de sua periodicidade. Proibido se charge for AUTO.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.maxAmountPerPayment</code></td>
         <td class="type">
            <span class="param-type">double</span>
         </td>
         <td class="description last">Valor máximo de cada cobrança. Proibido se charge for AUTO.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.maxTotalAmount</code></td>
         <td class="type">
            <span class="param-type">double</span>
         </td>
         <td class="description last">Valor máximo que pode ser cobrado durante a vigência da assinatura.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.maxPaymentsPerPeriod</code></td>
         <td class="type">
            <span class="param-type">int</span>
         </td>
         <td class="description last">Número máximo de cobranças que podem ser realizadas por período. Proibido se charge for AUTO.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.initialDate</code></td>
         <td class="type">
            <span class="param-type">date</span>
         </td>
         <td class="description last">Início da vigência do plano. As cobranças somente serão iniciadas após esta data. Formato: YYYY-MM-DDThh:mm:ss.sTZD. Valores aceitos: data atual <= preApprovalInitialDate <= data atual + 2 anos. Obrigatório se expiration for nulo, proibido se expiration não for nulo. Proibido se charge for AUTO.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.finalDate</code></td>
         <td class="type">
            <span class="param-type">date</span>
         </td>
         <td class="description last">Fim da vigência do plano. As cobranças cessarão após esta data. Formato: YYYY-MM-DDThh:mm:ss.sTZD. Valores aceitos: Se preApprovalInitialDate for informado então preApprovalInitialDate < preApprovalFinalDate <= preApprovalInitialDate + valor definido no perfil, caso contrário, data atual < preApprovalFinalDate <= data atual + valor definido no perfil. Obrigatório se expiration for nulo, proibido se expiration não for nulo.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.dayOfYear</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Dia do ano em que a cobrança será realizada. Formato: MM-dd. Obs: Não pode ser utilizado em conjunto com dayOfWeek ou dayOfMonth. Se presente, period deve ser informado como YEARLY. Não pode ser utilizado em conjunto com charge = AUTO.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.dayOfMonth</code></td>
         <td class="type">
            <span class="param-type">int</span>
         </td>
         <td class="description last">Dia do mês em que a cobrança será realizada. Obs: Não pode ser utilizado em conjunto com dayOfWeek ou dayOfYear. Se presente, period deve ser informado como MONTHLY, BIMONTHLY, TRIMONTHLY ou SEMIANNUALLY. Não pode ser utilizado em conjunto charge = AUTO.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.dayOfWeek</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Dia da semana em que a cobrança será realizada. Obs: Não pode ser utilizado em conjunto com dayOfMonth ou dayOfYear. Se presente, period deve ser informado como WEEKLY. Não pode ser utilizado em conjunto com charge = AUTO.</td>
      </tr>
      <tr>
         <td class="name"><code>preApproval.cancelURL</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Url para onde o assinante será redirecionado caso este solicite o cancelamento da assinatura no site do PagSeguro (fluxo de retenção).</td>
      </tr>
      <tr>
         <td class="name"><code>reviewURL</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">URL para onde o assinante será redirecionado, durante o fluxo de pagamento, caso o mesmo queira alterar/revisar as regras da assinatura. Este valor somente será utilizado caso queira utilizar este plano em um Pagamento Recorrente via botão.</td>
      </tr>
      <tr>
         <td class="name"><code>maxUses</code></td>
         <td class="type">
            <span class="param-type">int</span>
         </td>
         <td class="description last">Quantidade máxima de consumidores que podem aderir ao plano.</td>
      </tr>
      <tr>
         <td class="name"><code>receiver.email</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Especifica o e-mail que deve aparecer na tela de pagamento. Formato: Um e-mail válido, com limite de 60 caracteres. O e-mail informado deve estar vinculado à conta PagSeguro que está realizando a chamada à API.</td>
      </tr>
   </tbody>
</table>

---

## Aderir ao Plano
Para aderir um usuário a um plano em sua conta PagSeguro, chame a função **createSession()** da API, para criar uma nova sessão, seguida da **joinPlan(body)**, passando como parâmetro um JSON estruturado conforme o parâmetro Body em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#ades%C3%A3o-ao-plano">Adesão ao Plano da API de Recorrência</a>.

### Possíveis parâmetros do Body:
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
         <td class="name"><code>plan*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código do plano ao qual a assinatura será vinculada. Formato: Obtido no método /pre-approvals/request.</td>
      </tr>
     <tr>
         <td class="name"><code>reference</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código de referência da assinatura no seu sistema. Formato: Livre, com no mínimo 1 e no máximo 200 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.name*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome completo do consumidor. Formato: Livre, com no mínimo duas sequências de strings e limite total de 50 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.email*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">E-mail do consumidor. Formato: Um e-mail válido, com limite de 60 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.ip</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Endereço de IP de origem do consumidor. Obrigatório se hash for nulo. Formato: 4 números, de 0 a 255, separados por ponto.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.hash</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Identificador (fingerprint) gerado pelo vendedor por meio do JavaScript do PagSeguro. Obrigatório se ip for nulo. Formato: Obtido a partir do método Javascript <a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-biblioteca-javascript">PagseguroDirectPayment.getSenderHash()</a>.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.phone.areaCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">DDD do comprador. Formato: Um número de 2 dígitos correspondente a um DDD válido.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.phone.number*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Número do telefone do comprador. Formato: Um número entre 7 e 9 dígitos.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.street*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome da rua. Formato: Livre, com limite de 80 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.number*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Número. Formato: Livre, com limite de 20 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.complement*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Complemento (bloco, apartamento, etc.). Formato: Livre, com limite de 40 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.district*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Bairro. Formato: Livre, com limite de 60 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.city*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Cidade. Formato: Livre. Deve ser um nome válido de cidade do Brasil, com no mínimo 2 e no máximo 60 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.state*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Estado. Formato: Duas letras, representando a sigla do estado brasileiro correspondente.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.country*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">País.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.address.postalCode*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">CEP. Formato: Um número de 8 dígitos.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.documents.type*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Tipo de documento do comprador.</td>
      </tr>
     <tr>
         <td class="name"><code>sender.documents.value*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">CPF do comprador. Formato: Um número de 11 dígitos.</td>
      </tr>
     <tr>
         <td class="name"><code>paymentMethod.type*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Tipo do meio de pagamento utilizado na assinatura.</td>
      </tr>
     <tr>
         <td class="name"><code>paymentMethod.creditCard.token*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Token retornado no método Javascript <a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-biblioteca-javascript">PagSeguroDirectPayment.createCardToken()</a>.</td>
      </tr>
     <tr>
         <td class="name"><code>paymentMethod.creditCard.holder.name*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome conforme impresso no cartão de crédito. Formato: No mínimo 1 e no máximo 50 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>paymentMethod.creditCard.holder.birthDate*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Data de nascimento do dono do cartão de crédito. Formato: dd/MM/yyyy.</td>
      </tr>
     <tr>
         <td class="name"><code>paymentMethod.creditCard.holder.documents</code></td>
         <td class="type">
            <span class="param-type">object</span>
         </td>
         <td class="description last">Documentos do dono do cartão.</td>
      </tr>
     <tr>
         <td class="name"><code>paymentMethod.creditCard.holder.phone</code></td>
         <td class="type">
            <span class="param-type">object</span>
         </td>
         <td class="description last">Telefone do dono do cartão.</td>
      </tr>
     <tr>
         <td class="name"><code>paymentMethod.creditCard.holder.billingAddress</code></td>
         <td class="type">
            <span class="param-type">object</span>
         </td>
         <td class="description last">Endereço de Cobrança.</td>
      </tr>
   </tbody>
</table>

---

## Cobrar Plano
Para cobrar um plano em sua conta PagSeguro, chame a função **chargePlan(body)** da API, passando como parâmetro um JSON estruturado conforme o parâmetro Body em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#cobrar-plano">Cobrar Plano da API de Recorrência</a>.

### Possíveis parâmetros do Body:
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
         <td class="description last">Código da recorrência obtido no método /pre-approvals em joinPlan().</td>
      </tr>
      <tr>
         <td class="name"><code>reference</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código/Identificador para fazer referência à recorrência em seu sistema.</td>
      </tr>
     <tr>
         <td class="name"><code>senderHash</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Identificador (fingerprint) gerado pelo vendedor por meio do JavaScript do PagSeguro. Obrigatório se senderIp for nulo. Formato: Obtido a partir do método Javascript <a href="https://dev.pagseguro.uol.com.br/reference/checkout-transparente#transparente-biblioteca-javascript">PagseguroDirectPayment.getSenderHash()</a>.</td>
      </tr>
     <tr>
         <td class="name"><code>senderIp</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Endereço de IP de origem da assinatura, relacionado ao assinante. Obrigatório se hash for nulo. Formato: 4 números, de 0 a 255, separados por ponto.</td>
      </tr>
     <tr>
         <td class="name"><code>items.id*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Id do produto objeto da recorrência.</td>
      </tr>
     <tr>
         <td class="name"><code>items.description*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Descrição do produto objeto da recorrência.</td>
      </tr>
     <tr>
         <td class="name"><code>items.quantity*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Quantidade do produto.</td>
      </tr>
     <tr>
         <td class="name"><code>items.amount*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Valor cobrado. Formato: Decimal, com duas casas decimais separadas por ponto (p.e, 1234.56).</td>
      </tr>
     <tr>
         <td class="name"><code>items.weight</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Peso do produto. Formato: Decimal, com duas casas decimais separadas por ponto (p.e, 1234.56).</td>
      </tr>
     <tr>
         <td class="name"><code>items.shippingCost</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Valor do frete. Formato: Decimal, com duas casas decimais separadas por ponto (p.e, 1234.56).</td>
      </tr>
   </tbody>
</table>

---

## Retentativa de pagamento
Para realizar um novo pagamento de acordo com uma adesão a um plano em sua conta PagSeguro, chame a função **paymentRetry(preApprovalCode, paymentOrderCode)** da API, passando como parâmetros o preApprovalCode e o paymentOrderCode, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#listar-ordens-de-pagamento-1">Retentativa de Pagamento da API de Recorrência</a>.

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
         <td class="name"><code>preApprovalCode</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código que retorna na chamada de Adesão ao Plano</td>
      </tr>
      <tr>
         <td class="name"><code>paymentOrderCode</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código que retorna na chamada de Criação de plano.</td>
      </tr>
    </tbody>
</table>

---

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)
