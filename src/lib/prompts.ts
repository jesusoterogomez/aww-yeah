import basePrompts from "prompts";

export const prompts = (questions, ...args) => {
    const options = {
        onCancel: (_, answers) => {
            answers.__cancelled__ = true;
        },
    };

    return basePrompts(questions, {
        ...options,
        ...args,
    });
};
