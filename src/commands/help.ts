import chalk from "chalk";
import columnify from "columnify";

// Columnify doesn't have an option for vertical padding between elements. This is a newline + an empty space character to
// render each row of the table with a line break in the middle
const EMPTY_NEWLINE_CHARACTER = "\n‏‏‎ ‎";

export const help = async () => {
    const commands = columnify(
        [
            {
                command: chalk`{yellow aww help}`,
                description: chalk`{gray Displays this documentation ${EMPTY_NEWLINE_CHARACTER}}`,
            },
            {
                command: chalk`{yellow aww init}`,
                description: chalk`{gray Starts the wizard to set up this tool}.
                                   {cyan @note: Must be done before running any task} ${EMPTY_NEWLINE_CHARACTER}`,
            },
        ],
        {
            preserveNewLines: true,
            showHeaders: false,
            config: {
                command: { minWidth: 24 },
            },
        }
    );

    const tasks = columnify(
        [
            {
                command: chalk`{yellow aww run [service]}`,
                description: chalk`{gray Run the docker container for a service.}
                                   {cyan If you don't specify a service, you are able to pick multiple services from a list ${EMPTY_NEWLINE_CHARACTER}}`,
            },
            {
                command: chalk`{yellow aww stop [service]}`,
                description: chalk`{gray Stops the docker container of a service ${EMPTY_NEWLINE_CHARACTER}}`,
            },
            {
                command: chalk`{yellow aww restart [service]}`,
                description: chalk`{gray Restart the docker container of a service ${EMPTY_NEWLINE_CHARACTER}}`,
            },
            {
                command: chalk`{yellow aww login [service]}`,
                description: chalk`{gray Log in to the docker container of a service. The service must be already running ${EMPTY_NEWLINE_CHARACTER}}`,
            },
            {
                command: chalk`{yellow aww clone [service]}`,
                description: chalk`{gray Clone the repository of the service ${EMPTY_NEWLINE_CHARACTER}}`,
            },
        ],
        {
            preserveNewLines: true,
            showHeaders: false,
            config: {
                command: { minWidth: 24 },
                description: { maxWidth: 60 },
            },
        }
    );

    console.log();
    console.log(chalk`{green Command List:}`);
    console.log();
    console.log(chalk(commands));

    console.log();
    console.log(chalk`{green Service Tasks:}`);
    console.log(
        chalk`{gray [Not all services support every task. See aww.config.json]}`
    );
    console.log();
    console.log(chalk(tasks));
    console.log(
        chalk`{magenta @Pro Tip: If you don't specify the [service] argument you will be able to pick from
a list of services. For some commands you can choose multiple services at a time}`
    );
};
