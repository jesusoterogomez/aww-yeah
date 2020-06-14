import yargs from "yargs";
import * as commands from "commands";
import * as tasks from "tasks";
import prompts from "prompts";
import { runTask } from "lib/exec";
import { getServices } from "lib/config";

const run = async () => {
    const services = await getServices();

    let [task, service] = yargs.argv._; // positional arguments

    // If the first argument is one of the reserved command keywords, execute it instead of running a service task
    const commandList = Object.keys(commands);
    if (commandList.includes(task)) {
        return await commands[task]();
    }

    // If the user didn't specify the task name, show a list that lets the user pick from it.
    if (!task) {
        const response = await prompts([
            {
                type: "select",
                name: "task",
                message: "Which task do you want to run?:",
                choices: Object.keys(tasks).map((task) => {
                    return {
                        title: task,
                        value: task,
                    };
                }),
            },
        ]);

        task = response.task;
    }

    const taskList = Object.keys(tasks);

    // If the user didn't specify the service name. Display a list to help the user
    if (!service) {
        if (taskList.includes(task)) {
            return await tasks[task]();
        }

        const response = await prompts([
            {
                type: task ? "select" : null,
                name: "service",
                message: "Select a service:",
                choices: services.map((service) => {
                    return {
                        title: `${service.name} (${service.repo})`,
                        value: service.repo,
                    };
                }),
            },
        ]);

        service = response.service;
    }

    if (taskList.includes(task)) {
        return tasks[task](service);
    }

    return runTask(service, task);
};

run();
