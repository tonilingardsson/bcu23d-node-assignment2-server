import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export const writeFileAsync = async (folderName, filename, data) => {
    try {
        const filePath = path.join(__appdir, folderName, filename);

        await writeFile(filePath, JSON.stringify(data), 'utf8');
    } catch (error) {
        throw new Error(error.message);
    }
};

export const readFileAsync = async (folderName, filename) => {
    // If the file exists read the information redoing it into JavaScript object
    // If the file doesn't exist, or the file is empty, we need to check if it's an error or not
    // and return the right information...

    try {
        const filePath = path.join(__appdir, folderName, filename);

        if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
            return [];
        } else {
            const data = await readFile(filePath, { encoding: 'utf-8' });
            return JSON.parse(data);
        }
    } catch (error) {
        throw new Error(error.message);
    }

};