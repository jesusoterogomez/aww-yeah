import shell from "shelljs";
import childProcess from "child_process";
import {TaskNames} from "../types";
import {getRootDir} from "./config";
import {getService} from "./service";
import chalk from "chalk";
const shelljs = require("shelljs");
const colors = require("colors");

export const exec = (command, path) => {
    shell.exec(command, {
        cwd: path,
        stdio: "inherit",
    });
};

export const execSync = (command, path) => {
    return shell.exec(command, {
        cwd: path,
    });
};

export const runTask = async (serviceId, taskName) => {
    if (taskName === TaskNames.STATUS) {
        return await runStatus(serviceId, taskName);
    }

    const rootDir = await getRootDir();

    if (!rootDir) {
        return console.log(
            chalk`{white.bold You haven't configured {green.bold Aww Yeah} yet. Run {yellow.bold aww init} first :)}`
        );
    }

    const serviceData = await getService(serviceId);

    const task = serviceData?.tasks[taskName] as string;
    const path = rootDir + serviceData?.repo;

    if (!task) {
        console.log(
            chalk`{green.bold ${serviceId}} doesn't support the {green.bold ${taskName}} task`
        );
        return;
    }

    const [command, ...args] = task.split(" ");

    // Shell.js can't run interactive commands.
    // @see: https://github.com/shelljs/shelljs/wiki/FAQ#running-interactive-programs-with-exec
    return childProcess.spawn(command, args, {
        cwd: path,
        stdio: "inherit"
    });
};

const runStatus = async (serviceId, taskName) => {
    const serviceData = await getService(serviceId);

    const task = (serviceData?.tasks[taskName] as string).replace("{serviceId}", serviceId);

    const output = shelljs.exec(task, {silent: true});

    console.log('%s %s',
        (output.code === 0 ? colors.green("\u2713") : colors.red("\u2718")),
        serviceId
    );

    return output;
};
