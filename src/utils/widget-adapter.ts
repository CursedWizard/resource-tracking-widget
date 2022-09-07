import { DashboardAPI } from "hub-dashboard-addons";

class YoutrackCacheProvider {
  ytAPI: DashboardAPI | undefined;

  init(api: DashboardAPI) {
    this.ytAPI = api;
  }

  setItem(key: string, value: any) {
    this.ytAPI.storeCache({
      [key]: value
    });
  }

  async getItem(key: string) {
    const cache = await this.ytAPI.readCache();
    if (!cache)
      return null;

    return cache.result[key];
  }
}

export const ytCacheProvider = new YoutrackCacheProvider();
