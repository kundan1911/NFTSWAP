import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme} from "@chakra-ui/react";
import { configureChains, mainnet, WagmiConfig, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

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



const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <WagmiConfig client={client}>
      <App />
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
