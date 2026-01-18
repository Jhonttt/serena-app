const API_URL = 'http://localhost:3000';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  localStorage.setItem('accessToken', data.accessToken);
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
  return data.accessToken;
}

export async function logout() {
  await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  localStorage.removeItem('accessToken');
}

export async function fetchProtected() {
  const token = localStorage.getItem('accessToken');

  const res = await fetch('http://localhost:3000/protected', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new Error('UNAUTHORIZED');
  }

  return res.json();
}