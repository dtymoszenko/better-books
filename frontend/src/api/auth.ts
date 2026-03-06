import { apiFetch } from "../lib/api";
import type { AuthResponse } from "../types";

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.errors?.join(", ") ?? "Registration failed");
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Login failed");
  return data;
}
