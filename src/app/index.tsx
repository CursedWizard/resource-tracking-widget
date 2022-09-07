import React from "react";
import ReactDOM from "react-dom/client";

import DashboardAddons, { DashboardAPI } from "hub-dashboard-addons";
import "@jetbrains/ring-ui/dist/style.css";
import "./overrides.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Theme, { ThemeProvider } from "@jetbrains/ring-ui/dist/global/theme";
import { Widget } from "./app";
import { ytCacheProvider } from "../utils/widget-adapter";
import { tableDataStore } from "../utils/table-data";
import { ytAPI } from "../utils/yt-api";
import { theme } from "../theme";

function renderDOM() {
  ReactDOM.createRoot(document.getElementById("app")!).render(
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <Widget />
      </ThemeProvider>
    </ChakraProvider>
  );
}

async function initData(dashboardApi: DashboardAPI) {
  /**
   * !Order of initialization matters here.
   * First we assign YT api used to retrieve cache,
   * then we get cached data
   */
  ytCacheProvider.init(dashboardApi);
  tableDataStore.init();

  /** Receive projects / users data by yt api */
  await ytAPI.init(dashboardApi);
}

function main() {
  DashboardAddons.registerWidget(async (dashboardApi, registerWidgetApi) => {
    await initData(dashboardApi);
    renderDOM();
  });
}

main();
