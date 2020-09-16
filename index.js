const request = require("request");
const parseString = require("xml2js").parseString;

module.exports = class api_pagseguro {
    /**
    * Biblioteca NPM para conexão com o servidor PagSeguro via JavaScript, baseada na API https://dev.pagseguro.uol.com.br/reference/api-recorrencia.
    * @constructor
    * @param {string} email - Email de sua conta.
    * @param {string} token - Token de sua conta.
    * @param {string} auth - URL do PagSeguro.
    * @param {string} preapprovals - URL de adesão do plano.
    * @param {string} preapprovals_request - URL de criação do plano.
    * @param {string} preapprovals_payment - URL de cobrança do plano.
    * @param {string} recurring_payment - URL para criação de boletos.
    * @param {string} transactions - URL para o checkout transparente.
    * @param {string} session - URL para iniciar sessão para aderir um plano.
    * @param {string} sessionId - ID gerada pela session na função createSession().
    */
    constructor(credentials) {
        this.email = credentials.email;
        this.token = credentials.token;
        this.auth = credentials.auth;
        this.preapprovals = credentials.preapprovals;
        this.preapprovals_request = credentials.preapprovals_request;
        this.preapprovals_payment = credentials.preapprovals_payment;
        this.recurring_payment = credentials.recurring_payment;
        this.transactions = credentials.transactions;
        this.session = credentials.session;
        this.url_endpoint = "application/x-www-form-urlencoded;charset=ISO-8859-1";
        this.json_endpoint = "application/json;charset=UTF-8";
        this.xml_endpoint = "application/xml;charset=ISO-8859-1";
        this.accept_json = "application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1";
        this.sessionId = null;
    }

    /**
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

    /**
    * Iniciar sessão para aderir um plano.
    * @constructor
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

    /**
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

    /**
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

    /**
    * Retentativa de pagamento
    * @constructor
    * @param {string} preApprovalCode - Código que retorna na chamada de Adesão ao Plano.
    * @param {string} paymentOrderCode - Código que retorna na chamada de Criação de plano.
    */
    async paymentRetry(preApprovalCode, paymentOrderCode) {
        const options = {
            method: "POST",
            url: `${this.preapprovals}/${preApprovalCode}/payment-orders/${paymentOrderCode}/payment?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
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

    /**
    * Suspensão e Reativação
    * @constructor
    * @param {string} preApproval - Código de pre-approvals que retorna na Adesão do Plano.
    * @param {string} status - Novo status da assinatura.
    */
    async suspendReactivate(preApproval, status) {
        const body = {
            status: status
        }

        const options = {
            method: "PUT",
            url: `${this.preapprovals}/${preApproval}/status?token=${this.token}&email=${this.email}`,
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

    /**
    * Cancelamento de adesão
    * @constructor
    * @param {string} preApproval - Código de pre-approvals que retorna na Adesão do Plano.
    */
    async cancelAdherence(preApproval) {
        const options = {
            method: "PUT",
            url: `${this.preapprovals}/${preApproval}/cancel?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
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

    /**
    * Edição de Valor e Planos
    * @constructor
    * @param {string} preApprovalRequestCode - Código que retorna na chamada de Criação de plano
    * @param {string} amountPerPayment - Novo valor para cobrança do plano e para as adesões do plano.
    * @param {boolean} updateSubscriptions - Flag para indicar se a alteração de valor deve afetar as adesões vigentes do plano.
    */
    async editPlanValues(preApprovalRequestCode, amountPerPayment, updateSubscriptions) {
        const body = {
            amountPerPayment: amountPerPayment,
            updateSubscriptions: updateSubscriptions
        };

        const options = {
            method: "PUT",
            url: `${this.preapprovals_request}/${preApprovalRequestCode}/payment?email=${this.email}&token=${this.token}`,
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

    /**
    * Edição de Valor e Planos
    * @constructor
    * @param {string} preApprovalCode - Código que retorna na chamada de Adesão ao plano.
    * @param {string} type - Tipo do desconto a ser aplicado
    * @param {boolean} value - Valor do desconto a ser aplicado, de acordo com o tipo. Formato: Decimal, com duas casas decimais separadas por ponto, maior que 0.00 e deve ser compatível com o valor a ser descontado. Por exemplo: não é possível aplicar um desconto fixo de 11.00 para uma cobrança de 10.00, tal como não é possível informar uma porcentagem acima de 100.00.
    */
    async paymentDiscount(preApprovalCode, type, value) {
        const body = {
            type: type,
            value: value
        };

        const options = {
            method: "PUT",
            url: `${this.auth}/${preApprovalCode}/discount?email=${this.email}&token=${this.token}`,
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

    /**
    * Mudança de meio de pagamento
    * @constructor
    * @param {string} preApprovalCode - Código que retorna na chamada de Adesão ao plano.
    * @param {string} body - JSON estruturado com os parâmetros do body em https://dev.pagseguro.uol.com.br/reference/api-recorrencia#mudan%C3%A7a-de-meio-de-pagamento
    */
    async changePaymentMethod(preApprovalCode, body) {
        const options = {
            method: "PUT",
            url: `${this.preapprovals}/${preApprovalCode}/payment-method?email=${this.email}&token=${this.token}`,
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

    /**
    * Listar ordens de pagamento
    * @constructor
    * @param {string} preApprovalCode - Código que retorna na chamada de Adesão ao plano.
    */
    async listPaymentOrders(preApprovalCode) {
        const options = {
            method: "GET",
            url: `${this.preapprovals}/${preApprovalCode}/payment-orders?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
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

    /**
    * Consulta pelo Código da Adesão
    * @constructor
    * @param {string} preApprovalCode - Código que retorna na chamada de Adesão ao plano.
    */
    async adherenceCodeConsult(preApprovalCode) {
        const options = {
            method: "GET",
            url: `${this.preapprovals}/${preApprovalCode}?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
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

    /**
    * Consulta por intervalo de datas
    * @constructor
    * @param {string} initialDate - Data inicial.
    * @param {string} finalDate - Data final.
    */
    async dateIntervalConsult(initialDate, finalDate) {
        const options = {
            method: "GET",
            url: `${this.preapprovals}/?email=${this.email}&token=${this.token}&initialDate=${initialDate}&finalDate=${finalDate}`,
            headers: {"Content-Type": this.json_endpoint, "Accept": this.accept_json},
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

    /**
    * Gerar boleto
    * @constructor
    * @param {string} body - JSON estruturado com os parâmetros do body em https://dev.pagseguro.uol.com.br/reference/api-recorrencia#api-boleto-providers-gerar-boleto
    */
    async recurringPayment(body) {
        const options = {
            method: "POST",
            url: `${this.recurring_payment}/boletos?email=${this.email}&token=${this.token}`,
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

    /**
    * Checkout Transparente
    * @constructor
    * @param {string} body - JSON estruturado com os parâmetros do body em https://dev.pagseguro.uol.com.br/reference/checkout-transparente (varia pelo método de pagamento)
    */
    async transparentCheckout(body) {
        const options = {
            method: "POST",
            url: `${this.transactions}/?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.xml_endpoint},
            body: body,
            json: true
        };

        let result = await new Promise(function (resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                parseString(body, function (err, result) {
					resolve(result);
				});
            });
        });

        return result;
    }

    /**
    * Cancelar transação
    * @constructor
    * @param {string} transactionCode - Código da transação. Transação deverá estar com os status "Aguardando pagamento" ou "Em análise". Formato: Uma sequência de 36 caracteres, com os hífens, ou 32 caracteres, sem os hífens.
    */
    async transparentCheckoutCancel(transactionCode) {
        const options = {
            method: "POST",
            url: `${this.transactions}/cancels?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.url_endpoint},
            body: {transactionCode: transactionCode},
            json: true
        };

        let result = await new Promise(function (resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                parseString(body, function (err, result) {
					resolve(result);
				});
            });
        });

        return result;
    }

    /**
    * Estornar transação
    * @constructor
    * @param {string} transactionCode - Código da transação. Transação deverá estar com os status "Paga", "Disponível" ou "Em disputa". Formato: Uma sequência de 36 caracteres, com os hífens, ou 32 caracteres, sem os hífens.
    * @param {string} refundValue - Valor do estorno. Utilizado no estorno de uma transação, corresponde ao valor a ser devolvido. Se não for informado, o PagSeguro assume que o valor a ser estornado é o valor total da transação. Formato: Decimal, com duas casas decimais separadas por ponto (p.e., 1234.56), maior que 0.00 e menor ou igual ao valor da transação.
    */
    async transparentCheckoutRefund(transactionCode, refundValue) {
        const options = {
            method: "POST",
            url: `${this.transactions}/refunds?email=${this.email}&token=${this.token}`,
            headers: {"Content-Type": this.url_endpoint},
            body: {transactionCode: transactionCode, refundValue: refundValue},
            json: true
        };

        let result = await new Promise(function (resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                parseString(body, function (err, result) {
					resolve(result);
				});
            });
        });

        return result;
    }
}