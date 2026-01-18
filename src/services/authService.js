const API_URL = 'http://localhost:3000';

function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();

  // Guardar token
  localStorage.setItem('accessToken', data.accessToken);

  // Guardar rol
  const payload = parseJwt(data.accessToken);
  if (payload?.role) {
    localStorage.setItem('role', payload.role);
  }

  return data;
}

export async function refreshToken() {
  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Refresh failed');

  const data = await res.json();

  localStorage.setItem('accessToken', data.accessToken);

  const payload = parseJwt(data.accessToken);
  if (payload?.role) {
    localStorage.setItem('role', payload.role);
  }

  return data.accessToken;
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  localStorage.removeItem('accessToken');
  localStorage.removeItem('role');
}