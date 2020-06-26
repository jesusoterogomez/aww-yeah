import { prompts } from "lib/prompts";
import { getServices } from "lib/config";
import { runTask } from "lib/exec";
import { isServiceCloned } from "lib/service";
import chalk from "chalk";
import { cloneService } from "./clone";

export const setupService = async (serviceId) => {
    if (!(await isServiceCloned(serviceId))) {
        console.log(chalk`You haven't cloned {green.bold ${serviceId}} yet.`);

        const responses = await prompts([
            {
                type: "toggle",
                name: "shouldClone",
                message: "Do you want to clone the project(s) now?",
                initial: false,
                active: "yes",
                inactive: "no",
            },
        ]);

        if (!responses.shouldClone) {
            return console.log(
                chalk`
    Run {yellow.bold aww clone ${serviceId}} before trying to set up this service the next time`
            );
        }

        await cloneService(serviceId);
    }

    await runTask(serviceId, "setup");
};

export const setup = async (serviceId?: string) => {
    if (serviceId) {
        return setupService(serviceId);
    }

    const services = await getServices();

    const questions = [
        {
            type: "multiselect",
            name: "service",
            message: "Which services do you want to setup?",
            choices: services.map((service) => {
                return {
                    title: service.name,
                    value: service.repo,
                };
            }),
            instructions: false,
            hint: "- Space to select. Return to submit",
        },
    ];

    const responses = await prompts(questions as any);

    if (responses.__cancelled__) {
        return console.log(chalk`
    I get it, setup takes time. I'll be waiting, just run {yellow.bold aww setup [service]}`);
    }

    responses.service.forEach(async (service) => {
        await setupService(service);
    });
};
