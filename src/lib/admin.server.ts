import { createHmac, timingSafeEqual } from "node:crypto";
import { deleteCookie, getCookie, getRequest, setCookie } from "@tanstack/react-start/server";

const COOKIE = "kayz_admin";
const SEAL = "kayzcharmzz-admin-seal-v1-not-the-shop-password!";
const USER = "admin";
const PASS = "sparkle";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function mintAdminToken() {
  const exp = Date.now() + WEEK_MS;
  const payload = `admin.${exp}`;
  const sig = createHmac("sha256", SEAL).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token: string | undefined | null) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [user, expStr, sig] = parts;
  if (user !== "admin") return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = createHmac("sha256", SEAL).update(`${user}.${expStr}`).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

export function credentialsMatch(username: string, password: string) {
  return equal(username.trim().toLowerCase(), USER) && equal(password, PASS);
}

export function readAdminCookie() {
  return getCookie(COOKIE);
}

export function writeAdminCookie(token: string) {
  const url = getRequest().url;
  setCookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: url.startsWith("https:"),
  });
}

export function clearAdminCookie() {
  deleteCookie(COOKIE, { path: "/" });
}

export function isAdminFrom(token?: string | null) {
  return verifyAdminToken(token) || verifyAdminToken(readAdminCookie());
}
