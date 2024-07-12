import fs from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

export const writeFileAsync = async (folderName, filename, data) => {
    try {
        const filePath = path.join(__appdir, folderName, filename);

        await writeFile(filePath, JSON.stringify(data), 'utf8');
    } catch (error) {
        throw new Error(error.message);
    }
};

export const readFileAsync = async (folderName, filename) => { };