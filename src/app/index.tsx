import React from "react";
import { render } from "react-dom";
import DashboardAddons, { DashboardAPI } from "hub-dashboard-addons";
import "@jetbrains/ring-ui/dist/style.css";

import { ChakraProvider } from "@chakra-ui/react";
import Theme, { ThemeProvider } from "@jetbrains/ring-ui/dist/global/theme";
import { Widget } from "./app";
import { ytCacheProvider } from "../utils/widget-adapter";
import { tableDataStore } from "../utils/table-data";
import {ytAPI} from "../utils/yt-api";

function renderDOM() {
  render(
    <ChakraProvider>
      <ThemeProvider>
        <Widget />
      </ThemeProvider>
    </ChakraProvider>,
    document.getElementById("app")
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

  await ytAPI.init(dashboardApi)
}

function main() {
  DashboardAddons.registerWidget(async (dashboardApi, registerWidgetApi) => {
    await initData(dashboardApi);
    renderDOM();
  });
}

main();
