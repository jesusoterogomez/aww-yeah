import chalk from "chalk";
import { prompts } from "lib/prompts";
import { runTask } from "lib/exec";
import { getAvailableServicesByTask } from "lib/service";
import { TaskNames } from "types";

export const login = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, TaskNames.LOGIN);
    }

    const services = await getAvailableServicesByTask(TaskNames.LOGIN);

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

    const responses = await prompts(questions as any);

    if (responses.__cancelled__) {
        return console.log(chalk`
    Well, I guess we're not doing any work today ¯\\_(ツ)_/¯`);
    }

    return runTask(responses.service, TaskNames.LOGIN);
};
