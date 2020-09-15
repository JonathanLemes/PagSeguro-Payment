const api = require("./src/API-PagSeguro");
const credentials = require("./credentials.json");

const API = new api(credentials);

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

API.createPlan(body).then((res) => {
    console.log(res);
});

API.createSession().then((res) => {
    console.log(res);
});