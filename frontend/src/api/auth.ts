const BASE = "http://localhost:3000/api";

export type User = {
  id: number;
  email: string;
  created_at: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.errors?.join(", ") ?? "Registration failed");
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Login failed");
  return data;
}

export function saveToken(token: string) {
  localStorage.setItem("bb_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("bb_token");
}

export function removeToken() {
  localStorage.removeItem("bb_token");
}
