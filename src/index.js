import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme} from "@chakra-ui/react";
import { configureChains, WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum} from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets,RainbowKitProvider,} from '@rainbow-me/rainbowkit';
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



const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'bf3c2c1b6f185af66837b54609b3cb0b',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      <App />
      </RainbowKitProvider>
    </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
