import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";
import { chainConst } from "../consts/parameters";
import { clientIdConst } from "../consts/parameters";
import { get, post } from "../lib/api";
import supabase from "../utils/supabase";

const client = createThirdwebClient({
  clientId: clientIdConst,
});

const wallets = [
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
];

function ConnectButtonAuth() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={darkTheme({
        colors: {
          accentText: "hsl(216, 52%, 51%)",
          primaryButtonBg: "hsl(216, 52%, 51%)",
          accentButtonBg: "hsl(216, 52%, 51%)",
          modalBg: "hsl(228, 12%, 8%)",
          selectedTextBg: "hsl(240, 6%, 94%)",
          primaryButtonText: "hsl(240, 6%, 94%)",
        },
      })}
      connectButton={{ label: "CONNECT WALLET" }}
      connectModal={{
        size: "wide",
        showThirdwebBranding: false,
      }}
      accountAbstraction={{
        chain: chainConst, // replace with the chain you want
        factoryAddress: "0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb",
        sponsorGas: true,
      }}
      auth={{
        getLoginPayload: async ({ address, chainId }) => {
          const res = await fetch(import.meta.env.VITE_SUPABASE_LOGIN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address, chainId }),
          });
      
          if (!res.ok) {
            throw new Error("Erreur lors de la connexion avec Supabase");
          }
      
          const data = await res.json();
          return {
            domain: data.domain,
            address: data.address,
            statement: data.statement,
            uri: data.uri,
            version: data.version,
            chainId: data.chainId,
            nonce: data.nonce,
            issued_at: data.issuedAt,
            expiration_time: data.expirationTime,
            invalid_before: data.notBefore,
            resources: data.resources,
          };
        },
        doLogin: async () => {
          // Tu peux ajouter une logique locale ici si tu veux stocker un token ou des infos utilisateur
          console.log("Utilisateur connecté.");
        },
        isLoggedIn: async () => {
          // On peut ajouter une vérification locale plus tard (par exemple un cookie ou un localStorage)
          return true;
        },
        doLogout: async () => {
          // On vide le localStorage ou les cookies s’il y a des infos stockées
          console.log("Utilisateur déconnecté.");
        },
      }}       
    />
  );
}

export default ConnectButtonAuth