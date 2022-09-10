import React from "react";
import ReactDOM from "react-dom/client";

import DashboardAddons, { DashboardAPI } from "hub-dashboard-addons";
import "@jetbrains/ring-ui/dist/style.css";
import "./overrides.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Theme, { ThemeProvider } from "@jetbrains/ring-ui/dist/global/theme";
import { Widget } from "./app";
import { ytAPI } from "../utils/yt-api";
import { theme } from "../theme";
import {enableMapSet} from "immer";

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
  /** Receive projects / users data by yt api */
  await ytAPI.init(dashboardApi);
  enableMapSet();
}

function main() {
  DashboardAddons.registerWidget(async (dashboardApi, registerWidgetApi) => {
    await initData(dashboardApi);
    renderDOM();
  });
}

main();
