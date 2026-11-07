import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/App.css'
import { WalletProvider, WalletManager, NetworkId } from '@txnlab/use-wallet-react'
import { pera } from '@txnlab/use-wallet-pera'

const manager = new WalletManager({
  wallets: [pera()],
  defaultNetwork: NetworkId.MAINNET,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider manager={manager}>
      <App />
    </WalletProvider>
  </React.StrictMode>,
)
