import { serialize, parse } from "cookie";

export function setCookie(name: string, value: string, maxAge = 3600) {
  return serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge,
  });
}

export function getCookies(req) {
  const cookie = req.headers.cookie ?? "";
  return parse(cookie);
}

export function deleteCookie(name: string) {
  return serialize(name, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });
}
