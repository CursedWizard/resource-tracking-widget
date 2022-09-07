declare module "hub-dashboard-addons" {
  type CacheType = null | {
    result: any;
    timestamp: string;
    widgetVersion: number;
  }

  interface DashboardAPI {
    setTitle(label: string, labelUrl?: string): void;
    setLoadingAnimationEnabled(enabled: boolean): void;
    alert(message: string, type: string, timeout: number): string;
    enterConfigMode(): void;
    exitConfigMode(): void;
    storeCache(cache: Object): Promise<void>;
    readCache(): Promise<CacheType>;
    storeConfig(config: Object): Promise<void>;
    readConfig(): Promise<any>;
    fetch(serviceID: string, url: string, fetchConfig?: any): Promise<any>;
    fetchHub(url: string, fetchConfig?: any): Promise<any>;
    loadServices(applicationName: string): Promise<Array<any>>;
    removeWidget(): void;
  }

  interface RegisterWidgetAPIProps {
    onRefresh(): Promise<void>;
    onConfigure(): void;
  }

  type RegisterWidgetAPI = (props: RegisterWidgetAPI) => void;

  type WidgetType = (
    dashboardApi: DashboardAPI,
    registerWidgetApi: RegisterWidgetAPI
  ) => void;

  export function registerWidget(widget: WidgetType): Promise<void>;
}
