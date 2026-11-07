import { useState, useEffect } from 'react';
import algosdk from 'algosdk';
import { useWallet } from '@txnlab/use-wallet-react';

// Regresamos al nodo original
const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', '');
const appId = 3759918583;
const QUEES_ASA_ID = 3730071622;

export default function AirdropClaim() {
  const { activeAddress, signTransactions } = useWallet();
  const [status, setStatus] = useState<string>('');
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [isOptingIn, setIsOptingIn] = useState<boolean>(false);
  const [hasOptedInContract, setHasOptedInContract] = useState<boolean>(false);
  const [isCheckingOptIn, setIsCheckingOptIn] = useState<boolean>(false);
  const [queesBalance, setQueesBalance] = useState<number>(0);

  // Obtener el balance del token QUEES
  const fetchBalance = async () => {
    if (!activeAddress) return;
    try {
      const accountInfo = await algodClient.accountInformation(activeAddress).do();
      const asset = accountInfo.assets?.find((a: any) => a.assetId === QUEES_ASA_ID);
      setQueesBalance(asset ? asset.amount / 1000000 : 0);
    } catch (error) {
      console.error("Error al obtener balance:", error);
    }
  };

  // Verificar Opt-in al contrato
  useEffect(() => {
    let cancelled = false;
    const checkStatus = async () => {
      if (!activeAddress) {
        setHasOptedInContract(false);
        setQueesBalance(0);
        return;
      }
      setIsCheckingOptIn(true);
      try {
        const appInfo = await algodClient.accountApplicationInformation(activeAddress, appId).do();
        const optedIn = Boolean(appInfo?.appLocalState);
        if (!cancelled) {
          setHasOptedInContract(optedIn);
          setStatus(optedIn ? '✅ Ya estás registrado. Puedes reclamar tus 5 QUEES.' : '👉 Primero haz el Opt-in al Contrato.');
        }
        await fetchBalance();
      } catch (error: any) {
        if (!cancelled) {
          setHasOptedInContract(false);
          setStatus('👉 Primero haz el Opt-in al Contrato.');
        }
      } finally {
        if (!cancelled) setIsCheckingOptIn(false);
      }
    };
    checkStatus();
    return () => { cancelled = true; };
  }, [activeAddress]);

  const optInToContract = async () => {
    if (!activeAddress) return;
    setIsOptingIn(true);
    setStatus('⏳ Preparando Opt-in al Contrato...');
    try {
      const suggestedParams = await algodClient.getTransactionParams().do();
      const method = new algosdk.ABIMethod({ name: 'user_opt_in', args: [], returns: { type: 'void' } });
      const txn = algosdk.makeApplicationOptInTxnFromObject({
        sender: activeAddress,
        appIndex: appId,
        appArgs: [method.getSelector()],
        suggestedParams,
      });

      setStatus('✍️ Firmando Opt-in...');
      const encodedTxn = algosdk.encodeUnsignedTransaction(txn);
      const signedTxns = await signTransactions([encodedTxn], [0]);
      if (!signedTxns[0]) throw new Error("Cancelado");

      setStatus('🚀 Enviando...');
      await algodClient.sendRawTransaction(signedTxns[0]).do();

      setHasOptedInContract(true);
      setStatus('✅ ¡Opt-in exitoso! Ahora puedes reclamar.');
    } catch (error: any) {
      console.error(error);
      setStatus('❌ Error en el Opt-in: ' + (error.message || 'Revisa la consola'));
    } finally {
      setIsOptingIn(false);
    }
  };

  const checkAssetOptIn = async (): Promise<boolean> => {
    try {
      const accountInfo = await algodClient.accountInformation(activeAddress!).do();
      return accountInfo.assets?.some((a: any) => a.assetId === QUEES_ASA_ID) ?? false;
    } catch {
      return false;
    }
  };

  const claimTokens = async () => {
    if (!activeAddress) return;
    setIsClaiming(true);
    try {
      const alreadyOptedInAsset = await checkAssetOptIn();

      // PASO 1: Opt-in al ASA (si no se ha hecho)
      if (!alreadyOptedInAsset) {
        setStatus('⏳ Paso 1/2: Haciendo Opt-in al activo QUEES...');
        const suggestedParams = await algodClient.getTransactionParams().do();
        const assetOptInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          sender: activeAddress,
          receiver: activeAddress,
          amount: 0,
          assetIndex: QUEES_ASA_ID,
          suggestedParams,
        });
        const encodedOptIn = algosdk.encodeUnsignedTransaction(assetOptInTxn);
        const signedOptIn = await signTransactions([encodedOptIn], [0]);
        if (!signedOptIn[0]) throw new Error("Cancelado");

        await algodClient.sendRawTransaction(signedOptIn[0]).do();
        setStatus('⏳ Esperando confirmación del Opt-in al activo...');
        await algosdk.waitForConfirmation(algodClient, assetOptInTxn.txID().toString(), 10);
        setStatus('✅ Opt-in al activo confirmado. Preparando reclamo...');
      }

      // PASO 2: Claim
      setStatus('⏳ Paso 2/2: Reclamando tus 5 QUEES...');
      const suggestedParams = await algodClient.getTransactionParams().do();
      const method = new algosdk.ABIMethod({ name: 'claim', args: [], returns: { type: 'void' } });

      const claimTxn = algosdk.makeApplicationNoOpTxnFromObject({
        sender: activeAddress,
        appIndex: appId,
        appArgs: [method.getSelector()],
        foreignAssets: [QUEES_ASA_ID], // Vital para el contrato
        suggestedParams: {
          ...suggestedParams,
          fee: 3000, // Tarifa para cubrir transacciones internas
          flatFee: true,
        },
      });

      setStatus('✍️ Firmando reclamo en la billetera...');
      const encodedClaim = algosdk.encodeUnsignedTransaction(claimTxn);
      const signedClaim = await signTransactions([encodedClaim], [0]);
      if (!signedClaim || !signedClaim[0]) throw new Error("Cancelado");

      setStatus('🚀 Enviando reclamo a Algorand...');
      await algodClient.sendRawTransaction(signedClaim[0]).do();

      setStatus('⏳ Esperando confirmación...');
      await algosdk.waitForConfirmation(algodClient, claimTxn.txID().toString(), 10);

      setStatus(`✅ ¡Éxito! Revisa tu billetera.`);
      setTimeout(() => fetchBalance(), 2000);

    } catch (error: any) {
      console.error(error);
      if (error.message === "Cancelado") {
        setStatus('❌ Cancelaste la firma en la billetera. Inténtalo de nuevo.');
      } else {
        setStatus('❌ Error: ' + (error.message || 'Revisa la consola para más detalles'));
      }
    } finally {
      setIsClaiming(false);
    }
  };

  if (!activeAddress) {
    return (
      <div className="text-sm text-gray-400 mt-4 mb-4 text-center">
        Conecta tu billetera para reclamar tus 5 QUEES
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4 mb-4 gap-2">
      {queesBalance > 0 && (
        <div className="text-[#7CFF6B] font-bold text-lg mb-2">
          🪙 Tienes {queesBalance} QUEES
        </div>
      )}
      <button
        onClick={optInToContract}
        disabled={isOptingIn || isClaiming || hasOptedInContract || isCheckingOptIn}
        className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold disabled:opacity-50 transition-all"
      >
        {isCheckingOptIn ? 'Verificando...' : isOptingIn ? 'Procesando...' : hasOptedInContract ? '✅ Opt-in completado' : '1. Opt-in al Contrato'}
      </button>
      <button
        onClick={claimTokens}
        disabled={isClaiming || isOptingIn || !hasOptedInContract || isCheckingOptIn}
        className="px-6 py-3 rounded-full bg-[#FF6B1A] text-white font-bold disabled:opacity-50 transition-all"
      >
        {isClaiming ? 'Procesando...' : '2. 🎁 Reclamar mis 5 QUEES'}
      </button>
      {status && <p className="text-sm text-[#7CFF6B] mt-2 text-center max-w-xs">{status}</p>}
    </div>
  );
}
