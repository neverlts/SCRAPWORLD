import { createClient } from "@supabase/supabase-js";
import { ethers } from "ethers"; // Pour vérifier la signature
import { clientIdConst } from "@/consts/parameters";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { address, signature } = req.body;

    // Utilise ethers pour vérifier la signature
    const message = `Sign this message to login with your wallet: ${clientIdConst}`;
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    // Si l'adresse signée ne correspond pas à l'adresse fournie, on rejette la connexion
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: "Signature mismatch" });
    }

    // L'adresse est correcte, on peut enregistrer l'utilisateur dans Supabase
    const { data, error } = await supabase.from("users").upsert({
      wallet: address,
      xp: 0,
      level: 1,
      scrap: 0,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Enregistrer un cookie de session pour l'utilisateur
    res.status(200).json({ message: "User authenticated", wallet: address });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
