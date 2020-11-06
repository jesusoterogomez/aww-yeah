import { prompts } from "lib/prompts";
import { runTask } from "lib/exec";
import { TaskNames } from "types";
import { getAvailableServicesByTask } from "lib/service";
import chalk from "chalk";

export const stop = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, TaskNames.STOP);
    }

    const services = await getAvailableServicesByTask(TaskNames.STOP);

    const questions = [
        {
            type: "multiselect",
            name: "service",
            message: "Which services do you want to stop?",
            choices: services.map((service) => {
                return {
                    title: service.name,
                    value: service.repo
                };
            }),
            instructions: false,
            hint: "- Space to select. Return to submit",
        },
    ];

    const responses = await prompts(questions as any);

    if (responses.__cancelled__) {
        return console.log(chalk`
    I'll be here waiting for the time you actually need to stop something :)`);
    }

    responses.service.forEach(async (service) => {
        runTask(service, TaskNames.STOP);
    });
};
