import prompts from "prompts";
import { getServices } from "lib/config";
import { runTask } from "lib/exec";

export const login = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, "login");
    }

    const services = await getServices();

    const questions = [
        {
            type: "select",
            name: "service",
            message: "To which service you want to log in to?",
            choices: services.map((service) => {
                return {
                    title: service.name,
                    value: service.repo,
                };
            }),
        },
    ];

    const { service } = await prompts(questions as any);
    return runTask(service, "login");
};
