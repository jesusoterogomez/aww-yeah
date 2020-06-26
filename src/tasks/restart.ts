import { prompts } from "lib/prompts";
import { getState, setState } from "lib/config";
import { runTask } from "lib/exec";
import chalk from "chalk";
import { TaskNames } from "types";
import { getAvailableServicesByTask } from "lib/service";

export const restart = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, TaskNames.RESTART);
    }

    const services = await getAvailableServicesByTask(TaskNames.RESTART);
    const state = await getState();

    const prevChoices = state["remember:restart"] || [];

    const questions = [
        {
            type: "multiselect",
            name: "service",
            message: "Which services do you want to restart?",
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
    I guess everthing is running fine, then :)`);
    }
    // Remember responses for next time.
    await setState({ "remember:restart": responses.service });

    responses.service.forEach(async (service) => {
        runTask(service, TaskNames.RESTART);
    });
};
