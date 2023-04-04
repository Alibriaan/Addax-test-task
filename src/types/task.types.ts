import { Tag } from "./tag.types";

export interface Task {
  id: string;
  name: string;
  date: string;
  tags: Tag[];
}