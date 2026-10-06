import { useWallet } from '@txnlab/use-wallet-react'
import Account from './Account'

interface ConnectWalletInterface {
  openModal: boolean
  closeModal: () => void
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { wallets, activeAddress } = useWallet()

  if (!openModal) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#081638] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Conectar Wallet</h3>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {activeAddress && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <Account />
          </div>
        )}

        {!activeAddress && (
          <div className="mt-6 grid gap-3">
            {wallets?.map((wallet) => (
              <button
                key={`provider-${wallet.id}`}
                type="button"
                onClick={() => wallet.connect()}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-[#FF6B1A] hover:bg-white/[0.06]"
              >
                <img
                  alt={`wallet_icon_${wallet.id}`}
                  src={wallet.metadata.icon}
                  className="h-8 w-8 rounded-lg"
                />
                <span className="flex-1 text-sm font-medium text-white transition-colors group-hover:text-[#FF6B1A]">
                  {wallet.metadata.name}
                </span>
                <span className="text-white/40 transition-colors group-hover:text-[#FF6B1A]">→</span>
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-white/40">
          Al conectar aceptas los términos del club. Sin custodios, tú controlas tus llaves.
        </p>
      </div>
    </div>
  )
}

export default ConnectWallet