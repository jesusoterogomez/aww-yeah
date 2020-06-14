import prompts from "prompts";
import chalk from "chalk";
import { getService, isServiceCloned } from "lib/service";
import { getServices, getRootDir } from "lib/config";
import { exec } from "lib/exec";

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

    const services = await getServices();

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

    responses.service.forEach(async (serviceId) => {
        await cloneService(serviceId);
    });
};
