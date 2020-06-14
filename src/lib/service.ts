import { getRootDir, getServices } from "lib/config";
import fs from "fs";

export const getService = async (serviceRepoName?: string) => {
    const services = await getServices();
    return services.find((s) => s.repo === serviceRepoName);
};

export const isServiceCloned = async (serviceRepoName: string) => {
    const rootDir = await getRootDir();
    const path = rootDir + serviceRepoName;

    if (fs.existsSync(path)) {
        return true;
    }

    return false;
};
