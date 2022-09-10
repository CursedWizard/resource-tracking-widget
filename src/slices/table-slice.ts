import create from "zustand";
import { DayOfWeek } from "../types/application";
import { TagType } from "../types/resource-planning";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ytCacheStorage } from "../utils/yt-cache-storage";
import produce from "immer";
import { isFunction, isNumber } from "lodash";

type RowData = Map<
  string,
  {
    [key in DayOfWeek]?: {
      tags: TagType[];
    };
  }
>;

interface TableStore {
  users: string[];
  rowData: RowData;
  hasMember: (name: string) => boolean;
  removeMember: (name: string) => void;
  addMember: (name: string) => void;
  addTag: (tag: TagType, day: DayOfWeek, name: string) => void;
  removeTag: (tag: TagType, day: DayOfWeek, name: string) => void;
}

function removeItem<T>(
  arr: Array<T>,
  value: T | ((value: T) => boolean)
): Array<T> {
  const remove = (index: number) => {
    if (isNumber(index) && index > -1) arr.splice(index, 1);
  };

  if (isFunction(value)) remove(arr.findIndex(value));
  else remove(arr.indexOf(value));

  return arr;
}

export const useTableStore = create<TableStore>()(
  persist(
    (set, get) => ({
      users: [],
      rowData: new Map(),
      hasMember: (name) => !!get().rowData.get(name),
      removeMember: (name: string) => {
        set(
          produce((state) => {
            state.rowData.delete(name);
            removeItem(state.users, name);
          })
        );
      },
      addMember: (name: string) => {
        if (get().hasMember(name)) {
          return;
        }
        const days = {};
        Object.values(DayOfWeek)
          .filter((value) => typeof value !== "string")
          .forEach((value) => {
            // @ts-ignore
            days[value as DayOfWeek] = { tags: [] };
          });

        set(
          produce((state) => {
            state.users.push(name);
            state.rowData.set(name, days);
          })
        );
      },
      addTag: (tag: TagType, day: DayOfWeek, name: string) => {
        set(
          produce((state) => {
            state.rowData.get(name)[day].tags.push(tag);
          })
        );
      },
      removeTag: (tag: TagType, day: DayOfWeek, name: string) => {
        set(
          produce<ReturnType<typeof get>>((state) => {
            removeItem(
              state.rowData.get(name)[day].tags,
              (value) => value.key === tag.key
            );
          })
        );
      },
    }),
    {
      name: "resource-planning-w",
      getStorage: () => ytCacheStorage,
      serialize: (data) => {
        return JSON.stringify({
          ...data,
          state: {
            ...data.state,
            rowData: Array.from(data.state.rowData),
          },
        });
      },
      deserialize: (value) => {
        const data = JSON.parse(value);
        data.state.rowData = new Map(data.state.rowData);
        return data;
      },
    }
  )
);
