'use client';

/**
 * Robust import of react-idle-timer that works whether the package
 * exposes named ESM exports or a CommonJS default.
 *
 * Replace the entire src/__create/useDevServerHeartbeat.ts with this file.
 */

import * as idlePkg from 'react-idle-timer';

/**
 * Resolve useIdleTimer from multiple possible module shapes:
 *  - ESM named export:       export function useIdleTimer(...) { ... }
 *  - CommonJS default:       module.exports = { useIdleTimer: ... }
 *  - ESM reexporting default: export default { useIdleTimer: ... }
 */
const resolved: any = (idlePkg as any) || {};
const useIdleTimer: typeof resolved.useIdleTimer =
  (resolved && resolved.useIdleTimer) ||
  (resolved && resolved.default && (resolved.default.useIdleTimer)) ||
  undefined;

if (!useIdleTimer) {
  // If it's still not found, we create a safe no-op fallback so server build doesn't fail.
  // The hook is used for client heartbeat only, so it is safe to be a no-op on server.
  // Log a warning to the console when running in the browser to help debugging.
  const fallback = (..._args: any[]) => {
    if (typeof window !== 'undefined' && window?.console?.warn) {
      // eslint-disable-next-line no-console
      console.warn(
        '[useDevServerHeartbeat] react-idle-timer did not expose useIdleTimer. Heartbeat disabled.'
      );
    }
    return;
  };
  (module as any).exports = (module as any).exports || {};
  (module as any).exports.useIdleTimer = fallback;
}

/**
 * Exported hook used in the app.
 * On the client it will call react-idle-timer's useIdleTimer (if available).
 * On the server it safely does nothing.
 */
export function useDevServerHeartbeat() {
  try {
    if (useIdleTimer) {
      useIdleTimer({
        throttle: 60_000 * 3,
        timeout: 60_000,
        onAction: () => {
          void fetch('/', { method: 'GET' }).catch(() => {
            /* no-op */
          });
        },
      });
    } else {
      return;
    }
  } catch (err) {
    if (typeof window !== 'undefined' && window?.console?.warn) {
      // eslint-disable-next-line no-console
      console.warn('[useDevServerHeartbeat] failed to initialize:', err);
    }
  }
}
