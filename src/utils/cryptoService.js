function pemToArrayBuffer(pem) {
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(b64);
  const buf = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buf[i] = binary.charCodeAt(i);
  }
  return buf.buffer;
}

async function importPublicKey(pem) {
  return window.crypto.subtle.importKey(
    'spki',
    pemToArrayBuffer(pem),
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt'],
  );
}

async function encryptWithKey(cryptoKey, plaintext) {
  const encoded = new TextEncoder().encode(plaintext);
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    cryptoKey,
    encoded,
  );
  const bytes = new Uint8Array(encrypted);
  let binary = '';
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

let cachedKeyPromise = null;

function getPublicKey(baseUrl) {
  if (!cachedKeyPromise) {
    cachedKeyPromise = fetch(`${baseUrl}/admin/public-key`)
      .then(res => {
        if (!res.ok) throw new Error(`No se pudo obtener la clave pública (${res.status})`);
        return res.json();
      })
      .then(body => importPublicKey(body.data.publicKey))
      .catch(err => {
        cachedKeyPromise = null;
        throw err;
      });
  }
  return cachedKeyPromise;
}

export async function encryptPassword(password, baseUrl) {
  const cryptoKey = await getPublicKey(baseUrl);
  return encryptWithKey(cryptoKey, password);
}

export function clearPublicKeyCache() {
  cachedKeyPromise = null;
}
