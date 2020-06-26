import { prompts } from "lib/prompts";
import { getState, setState } from "lib/config";
import { runTask } from "lib/exec";
import { TaskNames } from "types";
import { getAvailableServicesByTask } from "lib/service";
import chalk from "chalk";

export const run = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, TaskNames.RUN);
    }

    const services = await getAvailableServicesByTask(TaskNames.RUN);
    const state = await getState();

    const prevChoices = state["remember:run"] || [];

    const questions = [
        {
            type: "multiselect",
            name: "service",
            message: "Which services do you want to run?",
            choices: services.map((service) => {
                return {
                    title: service.name,
                    value: service.repo,
                    selected: prevChoices.includes(service.repo),
                };
            }),
            instructions: false,
            hint: "- Space to select. Return to submit",
        },
    ];

    const responses = await prompts(questions as any);

    if (responses.__cancelled__) {
        return console.log(chalk`
    I'll be here waiting for the time you actually need to run something :)`);
    }

    // Remember responses for next time.
    await setState({ "remember:run": responses.service });

    responses.service.forEach(async (service) => {
        runTask(service, TaskNames.RUN);
    });
};
