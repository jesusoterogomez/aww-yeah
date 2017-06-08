var services = {
    gateway: {
        name: "gateway-service"
    },
    sign: {
        name: "Symfony2",
        dir: {
            logs: ['app/logs', 'app/logs/server']
        }
    },
    auth: {
        name: "api-auth",
        dir: {
            logs: ['var/logs', 'app/logs/server']
        }
    },
    frontend: {
        name: "fe-application-loader"
    },
    form: {
        name: "forms"
    },
    "pdf-eid": {
        name: "pdf-eid"
    },
    validator: {
        name: "validator"
    },
    sepior: {
        name: "SepiorService",
        dir: {
            logs: ['app/logs']
        }
    }
};

module.exports = services;
