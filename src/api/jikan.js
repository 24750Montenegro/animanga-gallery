// Cliente base para Jikan API v4
const BASE_URL = 'https://api.jikan.moe/v4';

export async function jikanFetch(path, params = {}) {
  const url = new URL(BASE_URL + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Jikan ${res.status}: ${res.statusText}`);
  return res.json();
}
