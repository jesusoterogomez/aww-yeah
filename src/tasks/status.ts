import { runTask } from "lib/exec";
import { TaskNames } from "types";
import { getAvailableServicesByTask } from "lib/service";

export const status = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, TaskNames.STATUS);
    }

    const services = await getAvailableServicesByTask(TaskNames.STATUS);

    services.forEach(async (service) => {
        runTask(service.repo, TaskNames.STATUS);
    });
};
