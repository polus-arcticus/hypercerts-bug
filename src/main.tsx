import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WagmiConfig, createConfig} from 'wagmi'
import { optimism } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { configureChains, mainnet  } from '@wagmi/core'
import { publicProvider  } from '@wagmi/core/providers/public'

const { chains, publicClient, webSocketPublicClient  } = configureChains(
  [optimism],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App/>
    </WagmiConfig>
  </React.StrictMode>,
)
