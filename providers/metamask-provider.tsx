'use client'

import { MetaMaskProvider } from '@metamask/sdk-react';

const MetaMaskProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Bit-tu",
          url: window.location.href,
        }
      }}
    >
      {children}
    </MetaMaskProvider>
  );
};

export default MetaMaskProviderWrapper; 