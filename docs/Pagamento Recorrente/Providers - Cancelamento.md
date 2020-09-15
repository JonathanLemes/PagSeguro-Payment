# Providers - Cancelamento

## Suspensão e Reativação
Para alterar o status da adesão a um plano em sua conta PagSeguro, chame a função **suspendReactivate(preApproval, status)** da API, passando como parâmetros o preApproval e o novo status, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#suspens%C3%A3o-e-reativa%C3%A7%C3%A3o">Suspensão e Reativação da API de Recorrência</a>.

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
         <td class="name"><code>preApproval*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código de pre-approvals que retorna na Adesão do Plano</td>
      </tr>
      <tr>
         <td class="name"><code>status*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Novo status da assinatura.</td>
      </tr>
    </tbody>
</table>

---

## Cancelamento de adesão
Para cancelar a adesão a um plano em sua conta PagSeguro, chame a função **cancelAdherence(preApproval)** da API, passando como parâmetro o preApproval, conforme em <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia#cancelamento-de-ades%C3%A3o">Cancelamento de Adesão da API de Recorrência</a>.

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
         <td class="name"><code>preApproval*</code></td>
         <td class="type">
            <span class="param-type">string</span>
         </td>
         <td class="description last">Código de pre-approvals que retorna na Adesão do Plano</td>
      </tr>
    </tbody>
</table>

---

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)