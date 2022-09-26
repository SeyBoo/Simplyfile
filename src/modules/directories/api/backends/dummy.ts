import {DirectoriesBackend} from "../index";
import {Directory} from "../../../../common/types/directory.interface";
import {dummyDirectories} from './dummy-data';

let directories = dummyDirectories;

export default class DummyDirectories implements DirectoriesBackend {
  async fetchDirectories(): Promise<Directory[]> {
    return directories;
  }

  async createDirectory(name: string): Promise<Directory> {
    const formattedNewDirectory = {
      name,
      uuid: name,
    }

    directories = [
      ...directories,
      formattedNewDirectory
    ];

    return formattedNewDirectory;
  }

  async updateDirectory(uuid: string, name: string): Promise<Directory[]> {
    const updatedDirectories = directories.map(directory => {
      if (directory.uuid === uuid) {
        return {
          name: name,
          uuid: uuid,
        }
      }

      return directory;
    });

    directories = updatedDirectories;

    return directories;
  }
}
