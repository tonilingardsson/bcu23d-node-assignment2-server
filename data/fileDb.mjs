// import { readFileAsync, writeFileAsync } from "../utilities/fileHandler.mjs";

// export const findUserByEmail = async (email) => {
//     const users = await loadUsers();
//     // Convert to lowercase []
//     const user = users.find((user) => user.email === email);

//     if (!user) {
//         throw new Error('User not found');
//     }

//     return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         password: user.password,
//     };
// };

// export const findUserById = async (id) => {
//     const users = await loadUsers();
//     const user = users.find((user) => user.id === id);

//     if (!user) throw new Error('User not found');

//     return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//     };
// }

// export const saveUser = async (user) => {
//     try {
//         const users = await loadUsers();
//         console.log(user);

//         users.push(user);

//         await writeFileAsync('data', 'users.json', JSON.stringify(users));
//     } catch (error) {
//         console.error('Error saving user:', error);
//         throw error;
//     }
// }

// const loadUsers = async () => {
//     // Write users to file if they don't exist yet
//     return await readFileAsync('data', 'users.json');
// }