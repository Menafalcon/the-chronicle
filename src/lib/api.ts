const BASE_URL = "https://spring-auth-template-1.onrender.com/api";

function getToken(): string | null {
  return localStorage.getItem("token");
}
function setToken(token: string): void {
  localStorage.setItem("token", token);
}
function clearToken(): void {
  localStorage.removeItem("token");
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || data?.error || "Something went wrong.");
  return data;
}

async function authRequest(path: string, options: RequestInit = {}) {
  const token = getToken();
  return request(path, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
  });
}

export const api = {
  register: (body: { userName: string; userPassword: string; userEmail: string; userTel?: string }) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { userName: string; userPassword: string }) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  verifyOtp: (email: string, code: string) =>
    request(`/auth/verify-otp?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`, { method: "POST" }),
  forgotPassword: (email: string) =>
    request(`/auth/forgot-password?email=${encodeURIComponent(email)}`, { method: "POST" }),
  resetPassword: (token: string, newPassword: string) =>
    request(`/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`, { method: "POST" }),
  getMe: () => authRequest("/auth/me"),
  getTest: () => authRequest("/test"),
  getToken,
  setToken,
  clearToken,
};