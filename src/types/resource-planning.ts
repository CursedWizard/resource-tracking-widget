import { DayOfWeek } from "./application";

export interface TagType {
  key: string;
  label: string;
}

export interface TagsByMember {
  [key: string]: {
    [key in DayOfWeek]?: {
      tags: TagType[];
    };
  };
}
