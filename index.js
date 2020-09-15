const api = require("./src/API-PagSeguro");
const credentials = require("./credentials.json");

const API = new api(credentials);
API.createPlan("01", "Teste01", "MANUAL", "MONTHLY", 10, "YEARS").then((res) => {
    console.log(res);
});