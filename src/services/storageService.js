// ─── storageService.js ────────────────────────────────────────────────────────
// Abstracción sobre localStorage.
// DIP: los módulos de alto nivel dependen de esta interfaz, no de localStorage.
// Si en el futuro se migra a sessionStorage o un store cifrado,
// solo cambia este archivo.

const KEYS = {
  USER:         'user',
  ACCESS_TOKEN: 'access_token',
  ID_USER:      'iduser',
  SIDEBAR_OPEN: 'sidebarOpen',
};

// ── Auth ──────────────────────────────────────────────────────────────────────

const getUser = () => {
  try {
    const raw = localStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const setUser = (user) => {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(KEYS.USER);
};

const getToken = () => localStorage.getItem(KEYS.ACCESS_TOKEN);

const setToken = (token) => {
  localStorage.setItem(KEYS.ACCESS_TOKEN, token);
};

const removeToken = () => {
  localStorage.removeItem(KEYS.ACCESS_TOKEN);
};

const setIdUser = (id) => {
  localStorage.setItem(KEYS.ID_USER, id);
};

const removeIdUser = () => {
  localStorage.removeItem(KEYS.ID_USER);
};

const clearSession = () => {
  removeUser();
  removeToken();
  removeIdUser();
};

// ── UI state ──────────────────────────────────────────────────────────────────

const getSidebarOpen = (defaultValue = true) => {
  try {
    const saved = localStorage.getItem(KEYS.SIDEBAR_OPEN);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setSidebarOpen = (isOpen) => {
  localStorage.setItem(KEYS.SIDEBAR_OPEN, JSON.stringify(isOpen));
};

// ─────────────────────────────────────────────────────────────────────────────

export const storageService = {
  getUser,
  setUser,
  removeUser,
  getToken,
  setToken,
  removeToken,
  setIdUser,
  removeIdUser,
  clearSession,
  getSidebarOpen,
  setSidebarOpen,
};
