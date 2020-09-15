const request = require("request");

/*
    * API para conexão com o servidor PagSeguro via JavaScript.
    * @constructor
    * @param {string} email - Email de sua conta.
    * @param {string} token - Token de sua conta.
    * @param {string} auth - URL do PagSeguro.
    * @param {string} preapprovals - URL de adesão do plano.
    * @param {string} preapprovals_request - URL de criação do plano.
    * @param {string} preapprovals_payment - URL de cobrança do plano.
    * @param {string} session - URL para iniciar sessão para aderir um plano.
*/
module.exports = class api_pagseguro {
    constructor(credentials) {
        this.email = credentials.email;
        this.token = credentials.token;
        this.auth = credentials.auth;
        this.preapprovals = credentials.preapprovals;
        this.preapprovals_request = credentials.preapprovals_request;
        this.preapprovals_payment = credentials.preapprovals_payment;
        this.session = credentials.session;
        this.url_endpoint = "application/x-www-form-urlencoded;charset=ISO-8859-1";
        this.json_endpoint = "application/json;charset=UTF-8";
        this.xml_endpoint = "application/xml;charset=ISO-8859-1";
        this.accept_json = "application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1";
    }

    /*
    * Criar plano.
    * @constructor
    * @param {string} redirectURL - URL para onde o assinante será redirecionado após a finalização do fluxo de pagamento. Este valor somente será utilizado caso queira utilizar este plano em um Pagamento Recorrente via botão.
    * @param {string} reference - Código/Identificador para fazer referência a assinatura em seu sistema.
    * @param {string} name - Nome/Identificador do plano. Formato: Livre, com limite de 100 caracteres.
    * @param {string} charge - Indica o modelo de cobrança do pagamento recorrente. Use AUTO para o modelo pré-pago e MANUAL para o modelo pós-pago.
    * @param {string} period - Periodicidade da cobrança.
    * @param {double} amountPerPayment - Valor exato de cada cobrança. Obrigatório para o modelo AUTO. Formato: Decimal, com duas casas decimais separadas por ponto (p.e, 1234.56). Deve ser um valor maior ou igual a 1.00 e menor ou igual a 2000.00.
    * @param {double} membershipFee - Valor da taxa de adesão. Sempre será cobrada juntamente com a primeira parcela do pagamento, independente se o plano é pré-pago ou pós-pago. Formato: Decimal, com duas casas decimais separadas por ponto (p.e, 1234.56), maior ou igual a 0.00 e menor ou igual a 1000000.00.
    * @param {int} trialPeriodDuration - Período de teste, em dias. A recorrência mantém o status INITIATED durante o período de testes, de modo que a primeira cobrança só ocorrerá após esse período, permitindo que a recorrência mude para ACTIVE. No caso de pagamento pré-pago, a cobrança se dá imediatamente após o fim do período de testes; no caso de pagamento pós-pago, a cobrança ocorre após o período de cobrança somado ao período de testes. Formato: Inteiro, maior ou igual a 1 e menor ou igual a 1000000.
    * @param {int} value - Um número inteiro maior ou igual a 1 e menor ou igual a 1000000.
    * @param {string} unit - Combine com value para obter a duração da recorrência, ex: 2 YEARS.
    * @param {string} details - Descrição do plano.
    * @param {double} maxAmountPerPeriod - Valor máximo que pode ser cobrado por mês de vigência da assinatura, independente de sua periodicidade. Proibido se charge for AUTO. 
    * @param {double} maxTotalAmount - Valor máximo que pode ser cobrado durante a vigência da assinatura. 
    * @param {int} maxPaymentsPerPeriod - Número máximo de cobranças que podem ser realizadas por período. Proibido se charge for AUTO.
    * @param {date} initialDate - Início da vigência do plano. As cobranças somente serão iniciadas após esta data. Formato: YYYY-MM-DDThh:mm:ss.sTZD. Valores aceitos: data atual <= preApprovalInitialDate <= data atual + 2 anos. Obrigatório se expiration for nulo, proibido se expiration não for nulo. Proibido se charge for AUTO.
    * @param {date} finalDate - Fim da vigência do plano. As cobranças cessarão após esta data. Formato: YYYY-MM-DDThh:mm:ss.sTZD. Valores aceitos: Se preApprovalInitialDate for informado então preApprovalInitialDate < preApprovalFinalDate <= preApprovalInitialDate + valor definido no perfil, caso contrário, data atual < preApprovalFinalDate <= data atual + valor definido no perfil. Obrigatório se expiration for nulo, proibido se expiration não for nulo.
    * @param {string} dayOfYear - Dia do ano em que a cobrança será realizada. Formato: MM-dd. Obs: Não pode ser utilizado em conjunto com dayOfWeek ou dayOfMonth. Se presente, period deve ser informado como YEARLY. Não pode ser utilizado em conjunto com charge = AUTO.
    * @param {int} dayOfMonth - Dia do mês em que a cobrança será realizada. Obs: Não pode ser utilizado em conjunto com dayOfWeek ou dayOfYear. Se presente, period deve ser informado como MONTHLY, BIMONTHLY, TRIMONTHLY ou SEMIANNUALLY. Não pode ser utilizado em conjunto charge = AUTO.
    * @param {string} dayOfWeek - Dia da semana em que a cobrança será realizada. Obs: Não pode ser utilizado em conjunto com dayOfMonth ou dayOfYear. Se presente, period deve ser informado como WEEKLY. Não pode ser utilizado em conjunto com charge = AUTO.
    * @param {string} cancelURL - Url para onde o assinante será redirecionado caso este solicite o cancelamento da assinatura no site do PagSeguro (fluxo de retenção).
    * @param {string} reviewURL - URL para onde o assinante será redirecionado, durante o fluxo de pagamento, caso o mesmo queira alterar/revisar as regras da assinatura. Este valor somente será utilizado caso queira utilizar este plano em um Pagamento Recorrente via botão.
    * @param {int} maxUses - Quantidade máxima de consumidores que podem aderir ao plano.
    */
   async createPlan(reference, name, charge, period, value, unit, redirectURL, amountPerPayment, membershipFee, trialPeriodDuration, details, maxAmountPerPeriod, maxTotalAmount, maxPaymentsPerPeriod, initialDate, finalDate, dayOfYear, dayOfMonth, dayOfWeek, cancelURL, reviewURL, maxUses) {
    const body = {
        reference: reference,
        preApproval: {
            name: name,
            charge: charge,
            period: period,
            expiration: {
                value: value,
                unit: unit
            }
        },
        receiver: {
            email: this.email
        }
    }

    // Caso os valores opcionais sejam diferentes de "null" ou 0, adiciona ao parâmetro "body"
    if (redirectURL) body.redirectURL = redirectURL;
    if (amountPerPayment) body.preApproval.amountPerPayment = amountPerPayment;
    if (membershipFee) body.preApproval.membershipFee = membershipFee;
    if (trialPeriodDuration) body.preApproval.trialPeriodDuration = trialPeriodDuration;
    if (details) body.preApproval.details = details;
    if (maxAmountPerPeriod) body.preApproval.maxAmountPerPeriod = maxAmountPerPeriod;
    if (maxTotalAmount) body.preApproval.maxTotalAmount = maxTotalAmount;
    if (maxPaymentsPerPeriod) body.preApproval.maxPaymentsPerPeriod = maxPaymentsPerPeriod;
    if (initialDate) body.preApproval.initialDate = initialDate;
    if (finalDate) body.preApproval.finalDate = finalDate;
    if (dayOfYear) body.preApproval.dayOfYear = dayOfYear;
    if (dayOfMonth) body.preApproval.dayOfMonth = dayOfMonth;
    if (dayOfWeek) body.preApproval.dayOfWeek = dayOfWeek;
    if (cancelURL) body.preApproval.cancelURL = cancelURL;
    if (reviewURL) body.reviewURL = reviewURL;
    if (maxUses) body.maxUses = maxUses;

    const options = {
        method: "POST",
        url: `${this.preapprovals_request}/?email=${this.email}&token=${this.token}`,
        headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
        body: body,
        json: true
    };
    console.log(body);

    let result = await new Promise(function (resolve, reject) {
        request(options, function(error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(body);
        });
    });

    return result;
}
}