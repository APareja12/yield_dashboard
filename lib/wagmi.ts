import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Only initialize once
let wagmiConfigInstance: any = null;

export const wagmiConfig =
  wagmiConfigInstance ||
  getDefaultConfig({
    appName: 'Yield Dashboard',
    projectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
    chains: [mainnet, sepolia],
    ssr: true, // Enable server-side rendering support
  });

wagmiConfigInstance = wagmiConfig;
