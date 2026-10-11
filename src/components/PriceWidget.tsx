import { useState, useEffect } from 'react'

interface PriceData {
    algo: { usd: number } | null
    xalgo: { usd: number } | null
    quees: { algo: number; usd: number } | null
}

const PriceWidget = () => {
    const [prices, setPrices] = useState<PriceData>({
        algo: null,
        xalgo: null,
        quees: null,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // ALGO desde Binance (CORS friendly)
                const res = await fetch(
                    'https://api.binance.com/api/v3/ticker/price?symbol=ALGOUSDT'
                )
                const data = await res.json()
                const algoPrice = parseFloat(data.price) || 0

                // xALGO: 1 xALGO ≈ 1.10 ALGO (rewards acumulados)
                const xalgoPrice = algoPrice * 1.1

                // QUEES: precio actual del pool (0.003377 ALGO por QUEES)
                // Cuando el pool madure, actualizar este valor periódicamente
                const queesPriceInAlgo = 0.003377
                const queesPriceInUsd = queesPriceInAlgo * algoPrice

                setPrices({
                    algo: { usd: algoPrice },
                    xalgo: { usd: xalgoPrice },
                    quees: { algo: queesPriceInAlgo, usd: queesPriceInUsd },
                })
            } catch (err) {
                console.error('Error fetching prices:', err)
                setError('No se pudieron cargar los precios en vivo.')
            } finally {
                setLoading(false)
            }
        }

        fetchPrices()
        const interval = setInterval(fetchPrices, 60000)
        return () => clearInterval(interval)
    }, [])

    if (loading) {
        return (
            <div className="text-center py-12 text-white/60 animate-pulse">
                Cargando precios de mercado...
            </div>
        )
    }

    if (error) {
        return <div className="text-center py-12 text-red-400">{error}</div>
    }

    return (
        <section className="py-12 border-t border-white/5 bg-[#06102B]/50">
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-white/40 mb-8">
                    Precios de Mercado en Vivo
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <span className="text-2xl">⚡</span>
                            <h3 className="text-lg font-bold text-white">ALGO</h3>
                        </div>
                        <p className="text-3xl font-mono font-bold text-[#FF6B1A]">
                            ${prices.algo?.usd.toFixed(4)}
                        </p>
                        <p className="text-xs text-white/40 mt-2">Algorand</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <span className="text-2xl">🌿</span>
                            <h3 className="text-lg font-bold text-white">xALGO</h3>
                        </div>
                        <p className="text-3xl font-mono font-bold text-[#00A86B]">
                            ${prices.xalgo?.usd.toFixed(4)}
                        </p>
                        <p className="text-xs text-white/40 mt-2">Folks Finance</p>
                    </div>

                    <div className="rounded-2xl border border-[#FF6B1A]/30 bg-[#FF6B1A]/5 p-6 text-center">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <img src="/logo-quees.svg" alt="QUEES" className="h-8 w-8" />
                            <h3 className="text-lg font-bold text-white">QUEES</h3>
                        </div>
                        <p className="text-3xl font-mono font-bold text-[#FF6B1A]">
                            ${prices.quees?.usd.toFixed(6)}
                        </p>
                        <p className="text-xs text-white/40 mt-2">
                            {prices.quees?.algo.toFixed(6)} ALGO
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PriceWidget