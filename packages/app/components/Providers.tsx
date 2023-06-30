import '@rainbow-me/rainbowkit/styles.css';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { hardhat, mainnet, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const { chains, publicClient } = configureChains(
  [hardhat, mainnet, goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'ZKProofs Starter',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
