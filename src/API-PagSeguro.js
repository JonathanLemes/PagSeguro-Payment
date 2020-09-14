const request = require("request");

module.exports = class api_pagseguro {
    constructor(credentials) {
        this.email = credentials.email;
        this.token = credentials.token;
        this.auth = credentials.auth;
        this.preapprovals = credentials.preapprovals;
        this.preapprovals_request = credentials.preapprovals_request;
        this.preapprovals_payment = credentials.preapprovals_payment;
        this.notification_url = credentials.notification_url;
        this.session = credentials.session;
        this.url_endpoint = credentials.url_endpoint;
        this.json_endpoint = credentials.json_endpoint;
        this.xml_endpoint = credentials.xml_endpoint;
        this.accept_json = credentials.accept_json;
    }

    /*
    * Criar plano.
    * @constructor
    * @param {string} reference - Código/Identificador para fazer referência a assinatura em seu sistema.
    * @param {string} name - Nome/Identificador do plano. Formato: Livre, com limite de 100 caracteres.
    * @param {string} charge - Indica o modelo de cobrança do pagamento recorrente. Use AUTO para o modelo pré-pago e MANUAL para o modelo pós-pago.
    * @param {string} period - Periodicidade da cobrança.
    * @param {string} value - Um número inteiro maior ou igual a 1 e menor ou igual a 1000000.
    * @param {string} unit - Combine com value para obter a duração da recorrência, ex: 2 YEARS.
    */
    async createPlan(reference, name, charge, period, value, unit) {
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
            }
        }
        const postCreatePlan = {
            method: 'POST',
            url: this.preapprovals_request,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
            jar: 'JAR',
            followRedirect: true,
            followAllRedirects: true
        };

        let result = await new Promise(function (resolve, reject) {
            request(postCreatePlan, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(body);
            });
        });

        
    }
}