import DashboardAddons, { DashboardAPI } from "hub-dashboard-addons";

import { ytAPI } from "./yt-api";
import { persist, StateStorage } from "zustand/middleware";

class YtCacheStorage implements StateStorage {
  api: DashboardAPI;

  async initAPI() {
    if (this.api) return null;

    return new Promise((resolve, reject) => {
      DashboardAddons.registerWidget(
        async (dashboardApi, registerWidgetApi) => {
          this.api = dashboardApi;
          return resolve(dashboardApi);
        }
      );
    });
  }

  async setItem(key: string, value: any) {
    await this.initAPI();
    
    this.api.storeCache({
      [key]: value,
    });
  }

  async getItem(key: string) {
    await this.initAPI();
    const cache = await this.api.readCache();

    if (!cache) return null;

    return cache.result[key];
  }

  removeItem(key: string) {}
}

export const ytCacheStorage = new YtCacheStorage();
