import * as fs from 'fs';
import * as path from 'path';

const searchDirectory = './apps';

export function findFolder(folderNameToFind: string) {
  const directories = fs.readdirSync(searchDirectory, { withFileTypes: true });

  for (const dirent of directories) {
    if (dirent.isDirectory() && dirent.name === folderNameToFind) {
      return path.join(searchDirectory, dirent.name);
    }
  }

  console.log(`Folder "${folderNameToFind}" not found in ${searchDirectory}`);
  return null;
}
