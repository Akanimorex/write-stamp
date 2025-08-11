
//wallet connect

'use client';
import { ReactNode, useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, useChainId, useSwitchChain } from 'wagmi';
import {
  basecampTestnet,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import {  CampProvider } from '@campnetwork/origin/react';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'c07a8b898d6fe54dc9fe9fa799a81d07',
  chains: [basecampTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


const ChainGuard = ()=>{
  const chainId = useChainId();
  const {switchChain} = useSwitchChain();
  useEffect(() => {
    if (chainId !== basecampTestnet.id) {
      alert(`Please switch to Basecamp Testnet to use this dApp.`);  }
      
  },[chainId]);
  return null
}
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CampProvider clientId="fce77d7a-8085-47ca-adff-306a933e76aa">
          <RainbowKitProvider>
            <ChainGuard />
              {children}
          </RainbowKitProvider>
        </CampProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
