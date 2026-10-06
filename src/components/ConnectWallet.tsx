import { useWallet } from '@txnlab/use-wallet-react'

interface ConnectWalletInterface {
  openModal: boolean
  closeModal: () => void
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { wallets, activeAddress, activeWallet, disconnect } = useWallet()

  if (!openModal) return null

  const handleDisconnect = async () => {
    try {
      await disconnect()
      closeModal()
    } catch (err) {
      console.error('Error desconectando:', err)
    }
  }

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
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-white/40">Wallet conectada</p>
              <p className="mt-2 font-mono text-sm text-white break-all">{activeAddress}</p>
              {activeWallet && (
                <p className="mt-2 text-xs text-white/50">
                  {activeWallet.metadata.name} · MainNet
                </p>
              )}
            </div>

            <a
              href={`https://lora.algokit.io/mainnet/account/${activeAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl border border-[#FF6B1A]/40 bg-[#FF6B1A]/10 px-4 py-3 text-center text-sm font-semibold text-[#FF6B1A] transition-colors hover:border-[#FF6B1A] hover:bg-[#FF6B1A]/20"
            >
              Ver cuenta en Lora ↗
            </a>

            <button
              type="button"
              onClick={handleDisconnect}
              className="w-full rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition-colors hover:border-red-500 hover:bg-red-500/20 hover:text-red-300"
            >
              Desconectar Wallet
            </button>
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