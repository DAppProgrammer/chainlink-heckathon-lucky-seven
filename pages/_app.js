import { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import "../styles/globals.css";
import { TransactionProvider } from "../context/TransactionContext";

function MyApp({ Component, pageProps }) {
  const desiredChainId = 80001;
  return (
    <TransactionProvider>
      <ThirdwebProvider desiredChainId={desiredChainId}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </TransactionProvider>
  );
}

export default MyApp;
