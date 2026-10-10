import { useState } from "react";
import { useWallet } from "@txnlab/use-wallet-react";
import ConnectWallet from "./components/ConnectWallet";

const TOKEN = {
  name: "QueEsAlgo",
  symbol: "QUEES",
  assetId: "3730071622",
  network: "Algorand Mainnet",
  supply: "1,000,000 QUEES",
  decimals: "0",
};

const TREASURY_ADDRESS = "algoclub.algo";

const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Telegram", href: "https://t.me" },
  { label: "Discord", href: "https://discord.com" },
  { label: "GitHub", href: "https://github.com" },
];


const NAV_LINKS = [
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Transparencia", href: "#transparencia" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "White Paper", href: "/whitepaper.pdf" },
];

export default function App() {
  const { activeAddress } = useWallet();
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const handleConnectWallet = () => {
    setOpenWalletModal(true);
  };

  return (
    <div className="min-h-screen bg-[#06102B] font-sans text-white antialiased selection:bg-[#FF6B1A] selection:text-white">
      <Navbar onConnectWallet={handleConnectWallet} walletAddress={activeAddress} />
      <main>
        <Hero onConnectWallet={handleConnectWallet} walletAddress={activeAddress} />
        <Tokenomics />
        <Transparency />
      </main>
      <Footer />
      <ConnectWallet
        openModal={openWalletModal}
        closeModal={() => setOpenWalletModal(false)}
      />
    </div>
  );
}

function shortAddress(address: string) {
  return address.length > 12
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : address;
}
function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label="QUEES Algo Club, inicio">
      <img
        src="/logo-quees.png"
        alt="QUEES Algo Club"
        className="h-10 w-10 rounded-lg"
      />
      <span className="text-sm font-semibold tracking-tight">
        QUEES <span className="text-white/50">Algo Club</span>
      </span>
    </a>
  );
}
}

type WalletProps = {
  onConnectWallet: () => void;
  walletAddress?: string | null;
};

function Navbar({ onConnectWallet, walletAddress }: WalletProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06102B]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Principal">
        <Logo />
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onConnectWallet}
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors hover:border-[#FF6B1A] hover:text-[#FF6B1A]"
        >
          {walletAddress ? shortAddress(walletAddress) : "Conectar"}
        </button>
      </nav>
    </header>
  );
}

function Hero({ onConnectWallet, walletAddress }: WalletProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B1A]/20 blur-[120px]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-28 pt-24 text-center md:pb-36 md:pt-32">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B1A]" aria-hidden="true" />
          Live en Algorand Mainnet · ASA {TOKEN.assetId}
        </span>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
          QUEES <span className="text-[#FF6B1A]">Algo</span> Club
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
          Comunidad, educación y tokenización en Algorand desde Guatemala{" "}
          <span role="img" aria-label="bandera de Guatemala">
            🇬🇹
          </span>
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onConnectWallet}
            className="group inline-flex items-center gap-3 rounded-full bg-[#FF6B1A] px-10 py-5 text-lg font-semibold text-[#06102B] shadow-[0_0_40px_-8px_#FF6B1A] transition-all hover:bg-[#FF8240] hover:shadow-[0_0_60px_-6px_#FF6B1A] active:scale-[0.98]"
          >
            <WalletIcon />
            {walletAddress ? `Conectado: ${shortAddress(walletAddress)}` : "Conectar Wallet"}
          </button>
          <a
            href="#tokenomics"
            className="rounded-full px-6 py-5 text-base font-medium text-white/70 transition-colors hover:text-white"
          >
            Ver tokenomics →
          </a>
        </div>
        <dl className="mt-20 grid w-full max-w-3xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          <Stat label="Suministro" value="1M" />
          <Stat label="Red" value="Algorand" />
          <Stat label="Origen" value="Guatemala" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-6">
      <dt className="text-xs uppercase tracking-widest text-white/40">{label}</dt>
      <dd className="text-lg font-semibold md:text-2xl">{value}</dd>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B1A]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-4 leading-relaxed text-white/60">{description}</p>
    </div>
  );
}

function Tokenomics() {
  const rows = [
    { label: "Nombre", value: TOKEN.name },
    { label: "Símbolo", value: TOKEN.symbol, highlight: true },
    { label: "Asset ID", value: TOKEN.assetId, mono: true },
    { label: "Red", value: TOKEN.network },
    { label: "Suministro", value: TOKEN.supply },
    { label: "Decimales", value: TOKEN.decimals, mono: true },
  ];

  return (
    <section id="tokenomics" className="scroll-mt-16 border-t border-white/5 bg-[#081638] py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="flex flex-col justify-between gap-10">
          <SectionHeading
            eyebrow="Tokenomics"
            title="El token QUEES"
            description="Un Algorand Standard Asset (ASA) con suministro fijo, diseñado para impulsar la participación y la educación de la comunidad."
          />
          <a
            href={`https://explorer.perawallet.app/asset/${TOKEN.assetId}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-[#FF6B1A] hover:underline"
          >
            Ver en el explorador ↗
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#06102B]">
          <table className="w-full text-left">
            <caption className="sr-only">Datos del token QUEES</caption>
            <tbody className="divide-y divide-white/10">
              {rows.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-white/[0.03]">
                  <th scope="row" className="px-6 py-5 text-sm font-normal text-white/50">
                    {row.label}
                  </th>
                  <td
                    className={`px-6 py-5 text-right text-base font-semibold ${row.mono ? "font-mono" : ""
                      } ${row.highlight ? "text-[#FF6B1A]" : "text-white"}`}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Transparency() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(TREASURY_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const pillars = [
    {
      title: "Reinversión",
      text: "Un porcentaje de los ingresos del club se reinvierte directamente en la comunidad.",
    },
    {
      title: "Educación",
      text: "Financiamos talleres, contenido y eventos sobre Algorand y Web3 en Guatemala.",
    },
    {
      title: "On-chain",
      text: "Todos los movimientos de la tesorería son públicos y verificables en la blockchain.",
    },
  ];

  return (
    <section id="transparencia" className="scroll-mt-16 border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Transparencia"
          title="Lo que entra, vuelve a la comunidad"
          description="Creemos en una economía abierta. Por eso, una parte de los ingresos se destina a fortalecer el ecosistema local y cualquiera puede auditar la tesorería."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="font-mono text-sm text-[#FF6B1A]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{pillar.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-[#FF6B1A] p-8 text-[#06102B] md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#06102B]/70">Tesorería del club</p>
            <p className="mt-2 break-all font-mono text-2xl font-bold md:text-4xl">{TREASURY_ADDRESS}</p>
          </div>
          <button
            type="button"
            onClick={copyAddress}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#06102B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D1F4D]"
          >
            {copied ? "¡Copiado!" : "Copiar dirección"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Dirección copiada al portapapeles" : ""}
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="comunidad" className="border-t border-white/5 bg-[#040B1F]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Comunidad, educación y tokenización en Algorand desde Guatemala.
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest text-white/40">Dirección del proyecto</p>
          <p className="mt-1 font-mono text-sm text-[#FF6B1A]">{TREASURY_ADDRESS}</p>
        </div>
        <nav aria-label="Redes sociales">
          <p className="text-xs uppercase tracking-widest text-white/40">Síguenos</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-[#FF6B1A] hover:text-[#FF6B1A]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/40">
          © {new Date().getFullYear()} QUEES Algo Club. Construido en Algorand.
        </p>
      </div>
    </footer>
  );
}

function WalletIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-transform group-hover:-rotate-6"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}