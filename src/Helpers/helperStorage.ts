// storageHelper.ts

/**
 * Guarda un valor (objeto o primitivo) en localStorage.
 * Internamente se convierte a JSON.
 */
export function setStorage<T>(key: string, value: T): void {
  try {
    const encoded = encodeURIComponent(JSON.stringify(value));
    localStorage.setItem(key, encoded);
  } catch (err) {
    console.error(`Error al guardar "${key}" en localStorage:`, err);
  }
}

/**
 * Obtiene un valor desde localStorage.
 * Si no existe o no puede decodificarse, retorna null.
 */
export function getStorage<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

/**
 * Elimina un valor de localStorage.
 */
export function deleteStorage(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Limpia todo el localStorage.
 */
export function clearStorage(): void {
  localStorage.clear();
}

/**
 * Devuelve todos los elementos del localStorage como objeto.
 */
export function getAllStorage(): Record<string, any> {
  const result: Record<string, any> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const value = getStorage(key);
    result[key] = value;
  }

  return result;
}
