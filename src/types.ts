enum ServiceNames {
    WEBAPP = "fe-webapp",
    ENTRYPOINT = "mock-entrypoint",
    GATEWAY = "gateway-service",
}

export type Service = {
    repo: ServiceNames;
    name: string;
    tasks: {
        [taskName: string]: string;
    };
};

export type LocalState = {
    rootDir: string;
    "remember:login": ServiceNames[];
    "remember:run": ServiceNames[];
    "remember:restart": ServiceNames[];
};
