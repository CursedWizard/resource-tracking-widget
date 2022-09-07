import { useCallback, useEffect, useMemo } from "react";
import { TagsByMember } from "../types/resource-planning";
import { makeAutoObservable } from "mobx";
import { DayOfWeek } from "../types/application";
import { ToggleTagParams } from "@jetbrains/ring-ui/dist/tags-input/tags-input";
import { ytCacheProvider } from "./widget-adapter";
import _ from "lodash";

class CachedData {
  cacheProvider = ytCacheProvider;

  constructor() {}

  keyPrefix = "resource-planning";

  set(key: string, value: any) {
    this.cacheProvider.setItem(
      `${this.keyPrefix}:${key}`,
      JSON.stringify(value)
    );
  }

  async get(key: string) {
    return this.cacheProvider.getItem(`${this.keyPrefix}:${key}`);
  }

  storeTableData(data: TagsByMember) {
    this.set("table-data", data);
  }

  async getTableData(): Promise<TagsByMember | {}> {
    return JSON.parse(await this.get("table-data")) ?? {};
  }
}

const cachedData = new CachedData();

class TableDataStore {
  tagsByMember: TagsByMember = {};
  tagsByMemberEditing: TagsByMember = {};

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    const cached = await cachedData.getTableData();
    this.tagsByMember = cached;
    this.tagsByMemberEditing = cached;
  }

  hasMember(name: string) {
    return !!this.tagsByMember[name];
  }

  removeMember(name: string) {
    if (this.tagsByMember[name])
      delete this.tagsByMember[name];
    if (this.tagsByMemberEditing[name])
      delete this.tagsByMemberEditing[name];
  }

  initByName(name: string) {
    this.tagsByMember[name] = {};
    Object.values(DayOfWeek)
      .filter((value) => typeof value !== "string")
      .forEach((value) => {
        this.tagsByMember[name][value as DayOfWeek] = { tags: [] };
      });
  }

  syncTagsEditingAndCache() {
    this.tagsByMemberEditing = _.cloneDeep(this.tagsByMember);
    cachedData.storeTableData(this.tagsByMember);
    console.log(JSON.stringify(this.tagsByMember));
  }

  addTag(params: ToggleTagParams, day: DayOfWeek, name: string) {
    if (!this.tagsByMember[name]) this.initByName(name);

    this.tagsByMember[name][day].tags.push({
      key: params.tag.key as string,
      label: params.tag.label as string,
    });
  }

  removeTag(params: ToggleTagParams, day: DayOfWeek, name: string) {
    if (!this.tagsByMember[name]) this.initByName(name);

    this.tagsByMember[name][day].tags = this.tagsByMember[name][
      day
    ].tags.filter((value) => value.key !== params.tag.key);
  }
}

export const tableDataStore = new TableDataStore();
