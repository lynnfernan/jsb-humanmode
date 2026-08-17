/**
 * Prolific study helpers for /eam-validation.
 * computeCode must stay byte-for-byte identical to the RA's verifier.
 */

const STORAGE_KEY = 'eam_validation_prolific_pid'

/** Exact formula provided for Prolific completion verification. Do not change. */
export function computeCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 9973
  }
  return String(hash).padStart(4, '0')
}

/**
 * Read PROLIFIC_PID from the current URL (and common Prolific casing variants).
 * @returns {string|null}
 */
export function readProlificPidFromUrl() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const raw =
    params.get('PROLIFIC_PID') ||
    params.get('prolific_pid') ||
    params.get('PROLIFIC_PID'.toLowerCase()) ||
    ''
  const pid = String(raw).trim()
  return pid || null
}

export function persistProlificPid(pid) {
  if (typeof window === 'undefined' || !pid) return
  try {
    sessionStorage.setItem(STORAGE_KEY, pid)
  } catch {
    // private mode / blocked storage — state alone still works for this session
  }
}

export function loadPersistedProlificPid() {
  if (typeof window === 'undefined') return null
  try {
    const pid = sessionStorage.getItem(STORAGE_KEY)
    return pid && pid.trim() ? pid.trim() : null
  } catch {
    return null
  }
}

/**
 * Capture order: URL first (canonical for Prolific), then sessionStorage.
 * URL wins and refreshes storage so a new study link overwrites a stale id.
 */
export function captureProlificPid() {
  const fromUrl = readProlificPidFromUrl()
  if (fromUrl) {
    persistProlificPid(fromUrl)
    return fromUrl
  }
  return loadPersistedProlificPid()
}
