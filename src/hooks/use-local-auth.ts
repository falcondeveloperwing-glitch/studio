// This file is deprecated in favor of Firebase Auth.
// Keeping it empty to avoid build errors if still imported elsewhere.
export function useLocalAuth() {
  return { user: null, loading: false, login: () => {}, logout: () => {} };
}
