import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

const Table: ComponentStyleConfig = {
  parts: ["th", "tr"],
  baseStyle: {
    tr: {
      color: "black",
    },
    th: {
      bg: "#F9F9F9",
      textTransform: "none",
      color: "#000 !important",
      textColor: "black",
      fontFamily: "var(--ring-font-family)",
      fontSize: "var(--ring-font-size)",
      letterSpacing: "0.1px",
    },
  },
};

export const theme = extendTheme({
  styles: {},
  components: {
    Text: {
      baseStyle: {
        fontFamily: "var(--ring-font-family)",
        fontSize: "var(--ring-font-size)",
      },
    },
    Table,
  },
});
