const request = require("request");
const parseString = require("xml2js").parseString;

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
    * @param {string} sessionId - ID gerada pela session na função createSession().
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
        this.sessionId = null;
    }

    /*
    * Criar plano.
    * @constructor
    * @param {JSON} body - JSON estruturado com os parâmetros do body em https://dev.pagseguro.uol.com.br/reference/api-recorrencia#criar-plano
    */
   async createPlan(body) {
        const options = {
            method: "POST",
            url: `${this.preapprovals_request}/?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
            body: body,
            json: true
        };

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

    /*
    * Iniciar sessão para aderir um plano.
    */
    async createSession() {
        const options = {
            method: "POST",
            url: `${this.session}/?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.url_endpoint}
        };

        let result = await new Promise(function (resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                parseString(body, function (err, result) {
					resolve(result.session.id[0]);
				});
            });
        });

        this.sessionId = result;
        return result;
    }

    /*
    * Aderir a um plano. Necessária a criação de uma Session executando this.createSession().
    * @constructor
    * @param {JSON} body - JSON estruturado com os parâmetros do body em https://dev.pagseguro.uol.com.br/reference/api-recorrencia#ades%C3%A3o-ao-plano
    */
    async joinPlan(body) {
        const options = {
            method: "POST",
            url: `${this.preapprovals}/?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
            body: body,
            json: true
        };

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

    /*
    * Cobrança do plano.
    * @constructor
    * @param {JSON} body - JSON estruturado com os parâmetros do body em https://dev.pagseguro.uol.com.br/reference/api-recorrencia#cobrar-plano
    */
    async chargePlan(body) {
        const options = {
            method: "POST",
            url: `${this.preapprovals_payment}/?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
            body: body,
            json: true
        };

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