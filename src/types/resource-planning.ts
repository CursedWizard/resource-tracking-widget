import { DayOfWeek } from "./application";

export interface TagType {
  key: string;
  label: string;
  iconUrl?: string;
}

export interface TagsByMember {
  [key: string]: {
    [key in DayOfWeek]?: {
      tags: TagType[];
    };
  };
}
