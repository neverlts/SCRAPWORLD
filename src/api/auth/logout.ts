import { deleteCookie } from "@/lib/cookies";

export default async function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({ message: "Logged out" });
    res.setHeader("Set-Cookie", deleteCookie("wallet"));
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
