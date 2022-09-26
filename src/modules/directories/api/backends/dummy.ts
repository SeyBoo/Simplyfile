import {DirectoriesBackend} from "../index";
import {Directory} from "../../../../common/types/directory.interface";
import {dummyDirectories} from './dummy-data';

let directories = dummyDirectories;

export default class DummyDirectories implements DirectoriesBackend {
  async fetchDirectories(): Promise<Directory[]> {
    return directories;
  }
}
