import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {},
  components: {
    Table: {
      parts: ["th"],
      baseStyle: {
        th: {
          color: "red",
        },
      },
    },
  },
});
