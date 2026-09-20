/**
 * Session, Cookie & Offline Storage Manager for Portfolio
 * Provides redundant persistence across LocalStorage, SessionStorage & Cookies.
 */

// Cookie Helpers
export function setCookie(name: string, value: string, days = 30): void {
  try {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    const secure = window.location.protocol === 'https:' ? '; SameSite=Lax; Secure' : '; SameSite=Lax';
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/${secure}`;
  } catch {
    // Ignore cookie errors in restricted sandboxes
  }
}

export function getCookie(name: string): string | null {
  try {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
  } catch {
    // Ignore
  }
  return null;
}

export function deleteCookie(name: string): void {
  try {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  } catch {
    // Ignore
  }
}

// Persistent Storage with Cookie Fallback
export function saveStorage<T>(key: string, data: T, persistInCookie = true): void {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
    sessionStorage.setItem(key, json);
    if (persistInCookie) {
      // Cookies have a 4KB limit; truncate if needed
      if (json.length < 3800) {
        setCookie(key, json, 14);
      }
    }
  } catch (err) {
    console.warn(`Storage save error for key ${key}:`, err);
  }
}

export function loadStorage<T>(key: string, defaultValue: T): T {
  try {
    // 1. Try LocalStorage
    const local = localStorage.getItem(key);
    if (local) return JSON.parse(local) as T;

    // 2. Try SessionStorage
    const session = sessionStorage.getItem(key);
    if (session) return JSON.parse(session) as T;

    // 3. Try Cookie Fallback
    const cookie = getCookie(key);
    if (cookie) return JSON.parse(cookie) as T;
  } catch (err) {
    console.warn(`Storage load error for key ${key}:`, err);
  }
  return defaultValue;
}

export function clearStorage(key: string): void {
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
    deleteCookie(key);
  } catch {
    // Ignore
  }
}
