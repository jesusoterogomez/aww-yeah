import prompts from "prompts";
import { getService } from "lib/service";
import { getServices, getState, setState } from "lib/config";
import { runTask } from "lib/exec";

export const restart = async (serviceId?: string) => {
    if (serviceId) {
        return runTask(serviceId, "restart");
    }

    const services = await getServices();
    const state = await getState();

    const prevChoices = state["remember:restart"] || [];

    const questions = [
        {
            type: "multiselect",
            name: "service",
            message: "Which services do you want to restart?",
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
    await setState({ "remember:restart": responses.service });

    responses.service.forEach(async (service) => {
        runTask(service, "restart");
    });
};
