const BASE_URL = 'https://api.jikan.moe/v4';
const REQUEST_DELAY = 400;
const CACHE_TTL = 5 * 60 * 1000;
const RETRIES = 2;

const cache = new Map();
const pending = new Map();
let queue = Promise.resolve();

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function buildUrl(path, params) {
  const url = new URL(BASE_URL + path);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function scheduleRequest(task) {
  const run = queue.then(async () => {
    await wait(REQUEST_DELAY);
    return task();
  });

  queue = run.catch(() => {});
  return run;
}

async function requestWithRetry(url, attempt = 0) {
  const res = await fetch(url);

  if (res.status === 429 && attempt < RETRIES) {
    const retryAfter = Number(res.headers.get('Retry-After'));
    const delay = Number.isFinite(retryAfter) ? retryAfter * 1000 : REQUEST_DELAY * 3;
    await wait(delay);
    return requestWithRetry(url, attempt + 1);
  }

  if (!res.ok) {
    const message = res.status === 429
      ? 'Limite de solicitudes alcanzado. Intenta de nuevo en unos segundos.'
      : `Jikan ${res.status}: ${res.statusText}`;
    throw new Error(message);
  }

  return res.json();
}

export async function jikanFetch(path, params = {}) {
  const url = buildUrl(path, params);
  const cached = cache.get(url);

  if (cached && Date.now() - cached.createdAt < CACHE_TTL) {
    return cached.data;
  }

  if (pending.has(url)) {
    return pending.get(url);
  }

  const request = scheduleRequest(() => requestWithRetry(url))
    .then((data) => {
      cache.set(url, { data, createdAt: Date.now() });
      return data;
    })
    .finally(() => {
      pending.delete(url);
    });

  pending.set(url, request);
  return request;
}
