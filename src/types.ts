enum ServiceNames {
    WEBAPP = "fe-webapp",
    ENTRYPOINT = "mock-entrypoint",
    GATEWAY = "gateway-service",
}

/**
 * List of special task names for commands that are treated specially.
 * For example, with an extra step in the prompt wizard.
 */
export enum TaskNames {
    LOGIN = "login",
    RESTART = "restart",
    RUN = "run",
    SETUP = "setup",
    CLONE = "clone",
    STOP = "stop"
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
