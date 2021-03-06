import shell from "shelljs";
import childProcess from "child_process";
import { getRootDir } from "./config";
import { getService } from "./service";
import chalk from "chalk";

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
        stdio: "inherit",
    });
};
