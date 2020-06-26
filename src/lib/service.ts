import { getRootDir, getServices } from "lib/config";
import fs from "fs";
import { Service, TaskNames } from "types";

export const getService = async (serviceRepoName?: string) => {
    const services = await getServices();
    return services.find((s) => s.repo === serviceRepoName);
};

export const isServiceCloned = async (serviceRepoName: string) => {
    const rootDir = await getRootDir();
    const path = rootDir + serviceRepoName;

    if (fs.existsSync(path)) {
        return true;
    }

    return false;
};

/**
 * Returns a list of all available tasks (from all services in aww.config.json)
 */
export const getAllAvailableTasks = async (): Promise<string[]> => {
    const services = await getServices();

    const tasks = services.reduce((prev, current) => {
        const taskNames = Object.keys(current.tasks);
        return prev.concat(taskNames);
    }, [] as string[]);

    // Return deduplicated array of task names
    // @see: https://stackoverflow.com/a/9229821
    return [...new Set(tasks)];
};

export const getAvailableTasksByService = async (
    serviceName: string
): Promise<string[]> => {
    const service = await getService(serviceName);

    if (!service) {
        return [];
    }

    return Object.keys(service.tasks);
};

/**
 * Returns a filtered list of services that have a specific task in their task list
 * @param taskName
 */
export const getAvailableServicesByTask = async (
    taskName: TaskNames
): Promise<Service[]> => {
    const services = await getServices();

    let availableServices = [] as Service[];

    services.forEach((service) => {
        if (Object.keys(service.tasks).includes(taskName)) {
            availableServices.push(service);
        }
    });

    return availableServices;
};
