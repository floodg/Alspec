import { SubItem } from "./SubItem";

export type Job = {
  id: number;
  title: string;
  description: string;
  subItems: SubItem[];
}