var services = {
    gateway: {
        name: "gateway-service",
        commands: {
            env: 'project-runner/login.sh prod'
        }
    },
    sign: {
        name: "Symfony2",
        logs: {
            directories: ['app/logs', 'app/logs/server'],
            profiles: {
                default: 'app/logs/server/nginx_access.log'
            }
        },
        port: 8000,
        docs: {
            publicUrl: "/app_dev.php/api/docs"
        }
    },
    auth: {
        name: "api-auth",
        logs: {
            directories: ['var/logs', 'app/logs/server'],
            profiles: {
                default: 'app/logs/server/nginx_access.log'
            }
        },
        port: 8002,
        docs: {
            publicUrl: "/app_dev.php/api/doc"
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
        name: "forms",
        port: 8001,
        docs: {
            publicUrl: "/app_dev.php/api/doc"
        }
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
