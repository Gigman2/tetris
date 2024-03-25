import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                fontSize: "md",
                fontFamily: '"Roboto", sans-serif',
                lineHeight: "tall",
                bg: "white",
            }
        })
    }
})