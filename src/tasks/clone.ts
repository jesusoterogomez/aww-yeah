import { prompts } from "lib/prompts";
import chalk from "chalk";
import {
    getService,
    isServiceCloned,
    getAvailableServicesByTask,
} from "lib/service";
import { getRootDir } from "lib/config";
import { exec } from "lib/exec";
import { TaskNames } from "types";

export const cloneService = async (serviceId) => {
    if (await isServiceCloned(serviceId)) {
        console.log(
            chalk`✅ {green.bold ${serviceId}} already exists in this directory. Skipping`
        );

        return;
    }

    const rootDir = await getRootDir();
    const serviceData = await getService(serviceId);

    const command = serviceData?.tasks.clone;

    // Clone repositories relative to the root directory
    exec(command, rootDir);
};

export const clone = async (serviceId?: string) => {
    if (serviceId) {
        return cloneService(serviceId);
    }

    const services = await getAvailableServicesByTask(TaskNames.CLONE);

    const questions = [
        {
            type: "multiselect",
            name: "service",
            message: "Which services do you want to clone?",
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
        Bye! You can always clone a repo by using the {yellow.bold aww yeah [service]} command`);
    }

    responses.service.forEach(async (serviceId) => {
        await cloneService(serviceId);
    });
};
