import { readFileAsync, writeFileAsync } from "../utilities/fileHandler.mjs";

export const saveUser = async (user) => {
    const users = await loadUsers();

    users.push(user);

    await writeFileAsync('data', 'users.json', JSON.stringify(users));
}

const loadUsers = async () => {
    // Write users to file if they don't exist yet
    return (await readFileAsync('data', 'users.json'));
}