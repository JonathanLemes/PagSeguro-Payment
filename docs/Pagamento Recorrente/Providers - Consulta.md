# Providers - Consulta

## Listar ordens de pagamento
Para listar as ordens de pagamento em sua conta PagSeguro, chame a função **listPaymentOrders(preApprovalCode)** da API, passando como parâmetro o preApprovalCode, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#listar-ordens-de-pagamento">Listar ordens de pagamento da API de Recorrência</a>.

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
         <td class="description last">Código que retorna na chamada de Adesão ao Plano</td>
      </tr>
    </tbody>
</table>

---

## Consulta pelo Código da Adesão
Para consultar uma assinatura pelo código da adesão em sua conta PagSeguro, chame a função **adherenceCodeConsult(preApprovalCode)** da API, passando como parâmetro o preApprovalCode, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#consultar-dados-dos-planos">Consulta pelo Código da Adesão da API de Recorrência</a>.

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
         <td class="description last">Código que retorna na chamada de Adesão ao Plano</td>
      </tr>
    </tbody>
</table>

---

## Consulta por intervalo de datas
Para consultar as assinaturas em um intervalo de datas em sua conta PagSeguro, chame a função **dateIntervalConsult(initialDate, finalDate)** da API, passando como parâmetros a data inicial e a data final, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#consulta-por-intervalo-de-datas">Consulta por intervalo de datas da API de Recorrência</a>.

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
         <td class="name"><code>initialDate*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Data inicial (p.e. 2019-08-09T01:00)</td>
      </tr>
      <tr>
         <td class="name"><code>finalDate*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Data final (p.e. 2019-08-10T00:00)</td>
      </tr>
    </tbody>
</table>

---

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)