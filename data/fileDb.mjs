import { writeFileAsync } from "../utilities/fileHandler.mjs";

export const saveUser = async (user) => {
    const users = [];

    users.push(user);
    await writeFileAsync('data', 'users.json', JSON.stringify(users));
}