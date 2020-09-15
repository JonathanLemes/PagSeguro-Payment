const api = require("./src/API-PagSeguro");
const credentials = require("./credentials.json");

const API = new api(credentials);

// var body = {
//     reference: "1", 
//     preApproval: {
//         name: "Teste01", 
//         charge: "MANUAL", 
//         period: "MONTHLY", 
//         expiration: {
//             value: 10, 
//             unit: "YEARS"
//         }
//     }
// }

// API.createPlan(body).then((res) => {
//     console.log(res);
// });

var body = {
    "plan":"659AB301DFDFE684448C1FB8B86F28F8",
    "reference":"ID-CND",
    "sender": {
        "name":"Comprador testes",
        "email":"adesao@sandbox.pagseguro.com.br",
        "ip":"192.168.0.1",
        "hash":"hash",
        "phone":{
            "areaCode":"11",
            "number":"999999999"
        },
        "address": {
            "street":"Av. Brigadeira Faria Lima",
            "number":"1384",
            "complement":"3 andar",
            "district":"Jd. Paulistano",
            "city":"São Paulo",
            "state":"SP",
            "country":"BRA",
            "postalCode":"01452002"
        },
        "documents":[
            {
                "type":"CPF",
                "value":"00000000191"
            }
        ]
    },
    "paymentMethod": {
        "type":"CREDITCARD",
        "creditCard": {
            "token":"59c9d69d2fcc439eb30c5d2da83fe2c3",
            "holder": {
                "name":"Nome Comprador",
                "birthDate":"11/01/1984",
                "documents": [
                    {
                        "type":"CPF",
                        "value":"00000000191"
                    }
                ],
                "billingAddress": {
                    "street":"Av. Brigadeiro Faria Lima",
                    "number":"1384",
                    "complement":"3 andar",
                    "district":"Jd. Paulistano",
                    "city":"São Paulo",
                    "state":"SP",
                    "country":"BRA",
                    "postalCode":"01452002"
                },
                "phone": {
                    "areaCode":"11",
                    "number":"988881234"
                }
            }
        }
    }
}

API.createSession().then((res) => {
    console.log(res);
});