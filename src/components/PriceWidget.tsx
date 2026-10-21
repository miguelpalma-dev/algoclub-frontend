import { useState, useEffect } from 'react';

// Definimos la estructura de los precios
interface PriceData {
    algo: { usd: number };
    xalgo: { usd: number };
    quees: { usd: number; algo: number };
}

const PriceWidget = () => {
    // Estado inicial (con valores de respaldo para que no se vea vacío al cargar)
    const [prices, setPrices] = useState<PriceData>({
        algo: { usd: 0.1145 },
        xalgo: { usd: 0.1260 },
        quees: { usd: 0.000387, algo: 0.003377 }
    });

    const [isLoading, setIsLoading] = useState(true);

    // Función que consulta la API de Tinyman/Vestige
    const fetchPrices = async () => {
        try {
            // 1. Consultamos el precio de QUEES (ID: 3730071622) y ALGO (ID: 0)
            // Usamos la API pública de Vestige que es rápida y no requiere API Key para consultas básicas
            const [queesRes, algoRes] = await Promise.all([
                fetch('https://api.vestigelabs.org/assets/3730071622'),
                fetch('https://api.vestigelabs.org/assets/0')
            ]);

            const queesData = await queesRes.json();
            const algoData = await algoRes.json();

            // 2. Actualizamos el estado con los datos reales
            setPrices({
                algo: { usd: algoData.usd_price || 0.1145 },
                xalgo: { usd: algoData.usd_price * 1.1 || 0.1260 }, // Aproximación si no hay API directa de xALGO
                quees: {
                    usd: queesData.usd_price || 0.000387,
                    algo: queesData.algo_price || 0.003377
                }
            });
            setIsLoading(false);
        } catch (error) {
            console.error("Error al obtener los precios:", error);
            // Si falla, mantenemos los precios anteriores en pantalla
        }
    };

    // El useEffect se encarga de ejecutar la función al inicio y luego cada 60 segundos
    useEffect(() => {
        fetchPrices(); // Primera llamada al montar el componente

        const intervalId = setInterval(() => {
            fetchPrices(); // Llamadas posteriores
        }, 60000); // 60,000 milisegundos = 1 minuto

        // Limpiamos el intervalo cuando el componente se desmonta (buena práctica)
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="py-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-center text-sm font-bold text-gray-400 tracking-widest uppercase mb-10">
                Precios de Mercado en Vivo {isLoading && "(Actualizando...)"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {/* Tarjeta ALGO */}
                <div className="rounded-2xl border border-white/10 bg-[#0F1423]/50 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-2xl">⚡</span>
                        <h3 className="text-lg font-bold text-white">ALGO</h3>
                    </div>
                    <p className="text-3xl font-mono font-bold text-[#FF6B1A]">
                        ${prices.algo.usd.toFixed(4)}
                    </p>
                    <p className="text-xs text-white/40 mt-2">Algorand</p>
                </div>

                {/* Tarjeta xALGO */}
                <div className="rounded-2xl border border-white/10 bg-[#0F1423]/50 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-2xl">🌿</span>
                        <h3 className="text-lg font-bold text-white">xALGO</h3>
                    </div>
                    <p className="text-3xl font-mono font-bold text-[#00A86B]">
                        ${prices.xalgo.usd.toFixed(4)}
                    </p>
                    <p className="text-xs text-white/40 mt-2">Folks Finance</p>
                </div>

                {/* Tarjeta QUEES */}
                <div className="rounded-2xl border border-[#FF6B1A]/30 bg-[#FF6B1A]/5 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <img src="/logo-quees.svg" alt="QUEES" className="h-8 w-8" />
                        <h3 className="text-lg font-bold text-white">QUEES</h3>
                    </div>
                    <p className="text-3xl font-mono font-bold text-[#FF6B1A]">
                        ${prices.quees.usd.toFixed(6)}
                    </p>
                    <p className="text-xs text-white/40 mt-2">
                        {prices.quees.algo.toFixed(6)} ALGO
                    </p>
                </div>

            </div>

            {/* Botón Tinyman */}
            <div className="mt-10 flex justify-center">
                <a
                    href="https://app.tinyman.org/#/swap?asset_in=0&asset_out=3730071622"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#FF6B1A] px-8 py-4 text-sm font-semibold text-[#0F1423] transition-transform hover:scale-105"
                >
                    Comprar QUEES en Tinyman ↗
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
            </div>
        </section>
    );
};

export default PriceWidget;