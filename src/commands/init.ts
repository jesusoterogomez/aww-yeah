import prompts from "prompts";
import shell from "shelljs";
import { getServices, getRootDir, setState } from "lib/config";
import { homedir } from "os";
import chalk from "chalk";
import { cloneService } from "tasks/clone";
import { setupService } from "tasks/setup";

const getQuestions = async () => {
    const rootDir = await getRootDir();
    const services = await getServices();

    return [
        {
            type: "text",
            name: "rootDir",
            message: `Where are your Penneo projects?`,
            initial: rootDir || homedir(),
        },
        {
            type: "toggle",
            name: "cloneMissingRepos",
            message: "Do you want to clone the project repositories?",
            initial: true,
            active: "yes",
            inactive: "no",
        },
        {
            type: (prev) => (prev == true ? "multiselect" : null),
            name: "reposToClone",
            message: "Which repos do you want to clone?",
            choices: services.map((service) => {
                return {
                    title: service.name,
                    value: service.repo,
                    selected: true,
                };
            }),
            instructions: false,
            hint: "- Space to select. Return to submit",
        },
        {
            type: "toggle",
            name: "setupProjects",
            message: "Do you want to setup the projects you cloned?",
            initial: true,
            active: "yes",
            inactive: "no",
        },
    ];
};

export const init = async () => {
    const responses = await prompts(await getQuestions(), {
        onCancel: (_, answers) => {
            answers.__cancelled_ = true;
        },
    });

    if (responses.__cancelled_) {
        return console.log(
            chalk`
    {yellow.bold Aw man :(}
    {white.bold Finish the whole thing to get started. It'll be worth it 🚀}
            `
        );
    }

    if (responses.rootDir) {
        // Create the directory recursively if it doesn't exist yet.
        shell.mkdir("-p", responses.rootDir);

        // Update the configuration to store the root directory for penneo projects
        // The path must end with a trailing slash. If the user didn't input it
        // we add it when storing it to the config
        await setState({
            rootDir: responses.rootDir,
        });
    }

    // Clone the services the user selected into the directory
    if (responses.reposToClone) {
        responses.reposToClone.forEach(async (serviceId) => {
            await cloneService(serviceId);
        });
    }

    // Setup the projects that were chosen to be cloned
    if (responses.setupProjects) {
        console.log(
            chalk`
        {yellow.bold Setting up projects. This could take a few minutes 🚀}
            `
        );
        responses.reposToClone.forEach(async (serviceId) => {
            await setupService(serviceId);
        });
    }

    console.log(
        chalk`
    {yellow.bold Aww yeah is ready to use 🚀}
    {white.bold Start by using the \`aww help\` command to see what you can do with it}
        `
    );
};
