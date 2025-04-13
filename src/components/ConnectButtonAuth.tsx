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
        // Étape 1 : récupérer le message de login
        getLoginPayload: async ({ address }) => {
          return get({
            url: "/api/auth/login",
            params: {
              address,
              chainId: chainConst.id.toString(),
            },
          });
        },
      
        // Étape 2 : envoyer la signature pour vérification
        doLogin: async (params) => {
          await post({
            url: "/api/auth/login",
            params,
          });
        },
      
        // Étape 3 : vérifier si l'utilisateur est connecté
        isLoggedIn: async () => {
          const res = await get({
            url: "/api/auth/isLoggedIn",
          });
      
          return res?.loggedIn === true;
        },
      
        // Étape 4 : déconnexion (supprime le cookie côté backend)
        doLogout: async () => {
          await post({
            url: "/api/auth/logout",
          });
        },
      }}      
    />
  );
}

export default ConnectButtonAuth