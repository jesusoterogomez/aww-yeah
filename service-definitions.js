var services = {
    gateway: {
        name: "gateway-service"
    },
    sign: {
        name: "Symfony2",
        logs: {
            directories: ['app/logs', 'app/logs/server'],
            profiles: {
                default: 'app/logs/server/nginx_access.log'
            }
        }
    },
    auth: {
        name: "api-auth",
        logs: {
            directories: ['var/logs', 'app/logs/server'],
            profiles: {
                default: 'app/logs/server/nginx_access.log'
            }
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
        logs: {
            directories: ['app/logs']
        }
    }
};

module.exports = services;
