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
        name: "fe-application-loader",
        commands: {
            up: 'npm start #aww-fe-application-loader',
            start: 'npm start #aww-frontend',
            stop: "ps ax | grep \\#aww-frontend | grep -v grep | awk '{print $1}' | xargs -I % kill %",
            isRunning: "ps ax | grep \\#aww-frontend | grep -v grep"
        }
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
