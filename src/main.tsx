import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/App.css'
import ErrorBoundary from './components/ErrorBoundary'
import { WalletManager, WalletId, NetworkId } from '@txnlab/use-wallet'
import { WalletProvider } from '@txnlab/use-wallet-react'

const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.EXODUS,
    {
      id: WalletId.WALLETCONNECT,
      options: {
        projectId: '8f5c6facf6ba740d97d6b02a0677b7d7',
      },
    },
  ],
  defaultNetwork: NetworkId.MAINNET,
  networks: {
    [NetworkId.MAINNET]: {
      algod: {
        baseServer: 'https://mainnet-api.algonode.cloud',
        port: '',
        token: '',
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WalletProvider manager={walletManager}>
        <App />
      </WalletProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)