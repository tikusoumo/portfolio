"use server";

import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getContent(filename: string) {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

export async function saveContent(filename: string, data: any) {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return { success: false, error: 'Failed to save content' };
  }
}

export async function getFilesList() {
    try {
        const files = await fs.readdir(CONTENT_DIR);
        return files.filter(file => file.endsWith(".json"));
    } catch (error) {
        console.error("Error reading content directory:", error);
        return [];
    }
}
