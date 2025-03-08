"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import scrapworldLogo from "@public/SCRAPWORLD.svg";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center justify-center container max-w-screen-lg mx-auto">
      <Header />
      <div className="flex flex-col items-center mt-10">
        <ConnectButton
          client={client}
          appMetadata={{
            name: "ScrapWorld",
            url: "https://scrapworld.com",
          }}
        />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center text-center mb-20">
      <Image
        src={scrapworldLogo}
        alt="ScrapWorld Logo"
        width={200}
        height={200}
        className="drop-shadow-lg"
      />
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-6 text-scrapworld-title">
        Welcome to ScrapWorld
      </h1>
      <p className="text-lg text-zinc-300 max-w-xl mt-4">
        Connect your wallet and explore a world unique in its own way, where
        NFTs evolve, quests unlock rewards, and surprises await at every turn.
        <SpeedInsights />
      </p>
    </header>
  );
}