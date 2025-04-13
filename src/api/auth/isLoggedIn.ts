import { getCookies } from "@/lib/cookies";

export default async function handler(req, res) {
  const cookies = getCookies(req);
  const wallet = cookies.wallet;

  if (wallet) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
}
