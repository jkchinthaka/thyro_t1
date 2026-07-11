import { api } from "@/services/api";
import { readCsrfCookie } from "@/services/csrf";
import type { AuthUser, LoginRequest, RegisterRequest, TokenResponse } from "@/types/auth";
import { toAppError } from "@/utils/apiError";

function csrfHeaders(): Record<string, string> {
  const token = readCsrfCookie();
  return token ? { "X-CSRF-Token": token } : {};
}

export async function register(payload: RegisterRequest): Promise<TokenResponse> {
  try {
    const { data } = await api.post<TokenResponse>("/auth/register", payload, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function login(payload: LoginRequest): Promise<TokenResponse> {
  try {
    const { data } = await api.post<TokenResponse>("/auth/login", payload, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function refresh(): Promise<TokenResponse> {
  try {
    const { data } = await api.post<TokenResponse>(
      "/auth/refresh",
      {},
      {
        withCredentials: true,
        headers: csrfHeaders(),
      },
    );
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
        headers: csrfHeaders(),
      },
    );
  } catch (error) {
    throw toAppError(error);
  }
}

export async function getCurrentUser(): Promise<AuthUser> {
  try {
    const { data } = await api.get<AuthUser>("/auth/me");
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}
