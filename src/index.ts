import yargs from "yargs";
import * as commands from "commands";
import * as tasks from "tasks";
import { prompts } from "lib/prompts";
import { runTask } from "lib/exec";
import chalk from "chalk";
import {
    getAvailableTasksByService,
    getAvailableServicesByTask,
} from "lib/service";
import { TaskNames } from "types";

const run = async () => {
    let [task, service] = yargs.argv._; // positional arguments

    // If the first argument is one of the reserved command keywords, execute it instead of running a service task
    const commandList = Object.keys(commands);
    if (commandList.includes(task)) {
        return await commands[task]();
    }

    // If the user didn't specify the task name, show a list that lets the user pick from it.
    if (!task) {
        const taskList = service
            ? await getAvailableTasksByService(service)
            : Object.keys(tasks);

        const response = await prompts([
            {
                type: "select",
                name: "task",
                message: "Which task do you want to run?:",
                choices: taskList.map((task) => {
                    return {
                        title: task,
                        value: task,
                    };
                }),
            },
        ]);

        if (response.__cancelled__) {
            return console.log(chalk`
    Aww man, calling for nothing is rude!`);
        }

        task = response.task;
    }

    const taskList = Object.keys(tasks);

    // If the user didn't specify the service name. Display a list to help the user
    if (!service) {
        // Get service list based on task compatibility.
        const serviceList = await getAvailableServicesByTask(task as TaskNames);

        // Handle the special tasks with the script specified in src/tasks/[taskName].ts
        if (taskList.includes(task)) {
            return await tasks[task]();
        }

        const response = await prompts([
            {
                type: task ? "select" : null,
                name: "service",
                message: "Select a service:",
                choices: serviceList.map((service) => {
                    return {
                        title: `${service.name} (${service.repo})`,
                        value: service.repo,
                    };
                }),
            },
        ]);

        if (response.__cancelled__) {
            return console.log(chalk`
    You didn't need my help anyways. Right?`);
        }

        service = response.service;
    }

    if (taskList.includes(task)) {
        return tasks[task](service);
    }

    return runTask(service, task);
};

run();
