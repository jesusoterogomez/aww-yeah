import prompts from "prompts";
import { getServices, getState, setState } from "lib/config";
import { runTask } from "lib/exec";

export const run = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, "run");
    }

    const services = await getServices();
    const state = await getState();

    const prevChoices = state["remember:run"] || [];

    const questions = [
        {
            type: "multiselect",
            name: "service",
            message: "Which services do you want to run?",
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

    // Remember responses for next time.
    await setState({ "remember:run": responses.service });

    responses.service.forEach(async (service) => {
        runTask(service, "run");
    });
};
