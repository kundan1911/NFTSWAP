import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme} from "@chakra-ui/react";

const colors = {
  black: "#000"
}


const theme = extendTheme({
  // components: {
  //   Button: defineStyleConfig({
  //     baseStyle: {
  //       color: "black"
  //     }
  //   })
  // },
  colors,
  styles: {
    global: {
      body: {
        bg: "hsl(226,56%,4%)",
        color: "white"
      },
    }
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
