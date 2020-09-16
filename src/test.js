const pagseguro_payment = require("pagseguro-payment");
const credentials = require("../credentials.json");

const pagseguroPayment = new pagseguro_payment(credentials);

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