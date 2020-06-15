// import JSONStorage from "node-json-file-storage";
import writeJSON from "write-json-file";
import readJSON from "load-json-file";
import lodash from "lodash";
import path from "path";
import { Service, LocalState } from "types";

const configFileUri = path.resolve(__dirname, "../", "aww.config.json");
const stateFileUri = path.resolve(__dirname, "../", "aww.state.json");

// save to file
const put = async (value, fileUri) => {
    const json: Object = await readJSON(fileUri);

    return await writeJSON(fileUri, {
        ...json,
        ...value,
    });
};

const get = async (key: string | null, fileUri) => {
    const file = await readJSON(fileUri);

    if (!key) {
        return file;
    }

    return lodash.get(file, key);
};

export const getServices = async (): Promise<Service[]> => {
    return await get("services", configFileUri);
};

export const getRootDir = async (): Promise<string> => {
    const rootDir = await get("rootDir", stateFileUri);

    if (!rootDir.endsWith("/")) {
        return rootDir + "/"; // Always return root directory with a trailing slash
    }

    return rootDir;
};

export const getState = async (): Promise<LocalState> => {
    return await get(null, stateFileUri);
};

export const setState = async (value: any): Promise<any> => {
    await put(value, stateFileUri);
};
