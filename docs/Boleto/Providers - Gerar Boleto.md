# Providers - Gerar Boleto

## Gerar boleto
Para um ou mais boletos em sua conta PagSeguro, chame a função **recurringPayment(body)** da API, passando como parâmetro o body conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-boleto#api-boleto-providers-gerar-boleto">Providers - Gerar Boleto da API de Boletos</a>.

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
         <td class="name"><code>body.reference</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Campo destinado a controles internos do vendedor. Tamanho máximo: 200 caracteres.</td>
      </tr>
      <tr>
         <td class="name"><code>body.firstDueDate*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Formato: aaaa-mm-dd. Data de vencimento para qual será gerado o primeiro boleto - permitido 1 dia à partir da data presente até D+30. Se o parâmetro numberOfPayments > 1, os próximos vencimentos seguirão com a mesma data informada na data dd nos períodos subsequentes. Para meses onde não existirem a data informada, será considerado sempre um dia anterior.</td>
      </tr>
      <tr>
         <td class="name"><code>body.numberOfPayments*</code></td>
         <td class="type">
            <span class="param-type">int</span>
         </td>
         <td class="description last">Informar a quantidade de boletos a serem gerados para cada comprador. À partir da primeira data de vencimento informada no campo firstDueDate, será gerada a quantidade de boletos informados neste campo, com vencimentos para os períodos subsequentes. Permitido preencher de 1 a 12.</td>
      </tr>
      <tr>
         <td class="name"><code>body.periodicity*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Frequência na qual os boletos serão gerados para cobrança. Necessário informar: monthly. Atualmente a chamada não aceita nenhum outro valor diferente.</td>
      </tr>
      <tr>
         <td class="name"><code>body.amount*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Informar o valor em reais a ser cobrado em cada boleto. Mínimo 5.00 e máximo 1000000.00. Formato: decimal, com duas casas decimais separadas por ponto (ex: 1234.56)</td>
      </tr>
      <tr>
         <td class="name"><code>body.instructions</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Campo instruções do boleto, personalizado para uso do vendedor. Tamanho: restrito a 100 caracteres.</td>
      </tr>
      <tr>
         <td class="name"><code>body.description*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Descrição do produto objeto da cobrança. Campo alfanumérico detalhado no extrato PagSeguro do comprador. Tamanho máximo: 100.</td>
      </tr>
      <tr>
         <td class="name"><code>body.customer*</code></td>
         <td class="type">
            <span class="param-type">object</span>
         </td>
         <td class="description last">Dados pessoais do comprador.</td>
      </tr>
      <tr>
         <td class="name"><code>body.document.type*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Especifica o tipo do documento é CPF ou CNPJ. Formato:CPF ou CNPJ</td>
      </tr>
      <tr>
         <td class="name"><code>body.document.value*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Especifica o CPF/CNPJ do comprador que está realizando o pagamento. Formato: Um número de 11 dígitos para CPF ou 14 dígitos para CNPJ. </td>
      </tr>
      <tr>
         <td class="name"><code>body.name*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome completo ou Razão Social do comprador do produto/serviço referente ao boleto gerado. Formato: Campo alfanumérico livre, com no mínimo duas sequências de strings. Tamanho máximo: 50 caracteres.</td>
      </tr>
      <tr>
         <td class="name"><code>body.phone.areaCode</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">DDD do comprador. Especifica o código de área (DDD) do comprador que está realizando o pagamento. Formato: Um número de 2 dígitos correspondente a um DDD válido.</td>
      </tr>
      <tr>
         <td class="name"><code>body.phone.number</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Número do telefone do comprador. Especifica o número do telefone do comprador que está realizando o pagamento. Formato: Um número de 8 a 9 dígitos.</td>
      </tr>
      <tr>
         <td class="name"><code>body.email</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Email do comprador</td>
      </tr>
      <tr>
         <td class="name"><code>body.address.street</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Nome da rua. Formato: Livre, com limite de 80 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.address.number</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Número. Formato: Livre, com limite de 20 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.address.complement</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Complemento (bloco, apartamento, etc.). Formato: Livre, com limite de 40 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.address.district</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Bairro. Formato: Livre, com limite de 60 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.address.city</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Cidade. Formato: Livre. Deve ser um nome válido de cidade do Brasil, com no mínimo 2 e no máximo 60 caracteres.</td>
      </tr>
     <tr>
         <td class="name"><code>body.address.state</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Estado. Formato: Duas letras, representando a sigla do estado brasileiro correspondente.</td>
      </tr>
     <tr>
         <td class="name"><code>body.address.postalCode</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">CEP. Formato: Um número de 8 dígitos.</td>
      </tr>
     <tr>
    </tbody>
</table>

---

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)