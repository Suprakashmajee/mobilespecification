import type { UserAccount } from "../types";

const KEY = "mobilespecific.user";
const USERS_KEY = "mobilespecific.users";

const seedAdmin: UserAccount = {
  id: "admin-local",
  email: "owner@mobilespecific.com",
  displayName: "Lab Owner",
  bio: "Hardware specifications editor. No price tags — silicon, optics, and endurance only.",
  avatarUrl: "",
  websiteUrl: "https://mobilespecific.com",
  role: "admin",
  favorites: ["s25u", "mbp16m4max", "fenix8"],
};

function readUsers(): Record<string, UserAccount & { password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      const seed = { [seedAdmin.email]: { ...seedAdmin, password: "lab-owner" } };
      localStorage.setItem(USERS_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function currentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UserAccount) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: UserAccount | null) {
  if (user) localStorage.setItem(KEY, JSON.stringify(user));
  else localStorage.removeItem(KEY);
}

export function registerUser(email: string, password: string, displayName: string): UserAccount {
  const users = readUsers();
  if (users[email]) throw new Error("An account already exists for this email.");
  const user: UserAccount = {
    id: crypto.randomUUID(),
    email,
    displayName,
    bio: "",
    avatarUrl: "",
    websiteUrl: "",
    role: "member",
    favorites: [],
  };
  users[email] = { ...user, password };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setCurrentUser(user);
  return user;
}

export function loginUser(email: string, password: string): UserAccount {
  const users = readUsers();
  const found = users[email];
  if (!found || found.password !== password) throw new Error("Email or password does not match.");
  const { password: _pw, ...user } = found;
  void _pw;
  setCurrentUser(user);
  return user;
}

export function updateUser(patch: Partial<UserAccount>): UserAccount {
  const user = currentUser();
  if (!user) throw new Error("Not signed in.");
  const next = { ...user, ...patch };
  const users = readUsers();
  if (users[user.email]) users[user.email] = { ...users[user.email], ...next };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setCurrentUser(next);
  return next;
}

export function toggleFavorite(deviceId: string): UserAccount {
  const user = currentUser();
  if (!user) throw new Error("Sign in to bookmark devices.");
  const favorites = user.favorites.includes(deviceId)
    ? user.favorites.filter((id) => id !== deviceId)
    : [...user.favorites, deviceId];
  return updateUser({ favorites });
}

export { seedAdmin };
