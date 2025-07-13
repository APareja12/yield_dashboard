import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'DeFi Yield Dashboard',
  projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: true,
});
