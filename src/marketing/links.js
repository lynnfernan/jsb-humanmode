/** Shared URLs for Human Mode marketing surfaces */

export const BOOK_URL =
  'https://www.amazon.com/Human-Mode-Unlock-Unique-Transform/dp/0063467542/ref=tmm_hrd_swatch_0'

export const SITE = 'https://jsb-humanmode.vercel.app'

export const LINKS = {
  hub: `${SITE}/hub`,
  fieldKit: `${SITE}/hub`,
  // Prefer short paths — fewer broken links than nested /playbooks/...
  quietUnderstanding: `${SITE}/quiet`,
  quietUnderstandingLong: `${SITE}/playbooks/quiet-understanding`,
  quietPdf: `${SITE}/playbooks/quiet-understanding.pdf`,
  quietPocket: `${SITE}/playbooks/quiet-understanding-pocket.pdf`,
  comphum: `${SITE}/comphum`,
  comphumLong: `${SITE}/playbooks/competent-humility`,
  comphumPdf: `${SITE}/playbooks/competent-humility-playbook.pdf`,
  comphumPocket: `${SITE}/playbooks/competent-humility-pocket.pdf`,
  bricolage: `${SITE}/bricolage`,
  bricolagePdf: `${SITE}/playbooks/bricolage-playbook.pdf`,
  bricolagePocket: `${SITE}/playbooks/bricolage-pocket.pdf`,
  // Legacy aliases (same assets)
  bricoleur: `${SITE}/bricolage`,
  bricoleurLong: `${SITE}/bricolage`,
  bricoleurPdf: `${SITE}/playbooks/bricolage-playbook.pdf`,
  bricoleurPocket: `${SITE}/playbooks/bricolage-pocket.pdf`,
  eam: `${SITE}/`,
  pulse: `${SITE}/competent-humility`,
  book: BOOK_URL,
}

export const SHARE = {
  quietTitle: 'Skip the Pep Talk · Quiet Understanding from Human Mode',
  quietText:
    'A free 60-second field guide for the moment after someone tells you something hard. Phrasebook + exercises from Jeffrey Sanchez-Burks.',
  bricolageTitle: 'Bricolage · free exercises from Human Mode',
  bricolageText:
    'Free exercises for the problem you cannot solve with what is officially in your job description. Rummage through what you already carry. From Jeffrey Sanchez-Burks.',
  bricoleurTitle: 'Bricolage · free exercises from Human Mode',
  bricoleurText:
    'Free exercises for the problem you cannot solve with what is officially in your job description. Rummage through what you already carry. From Jeffrey Sanchez-Burks.',
  hubTitle: 'The Human Mode, Always™ Field Kit · four free practices',
  hubText:
    'Four free practices from Human Mode: Read the Room, Tap the Rest of You, Drop the Certainty Theater, Skip the Pep Talk.',
}

export function linkedInShare(url) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
}

export function xShare(url, text) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
}

export function emailShare(subject, body) {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function utm(url, source, campaign = 'human_mode_hub') {
  const u = new URL(url)
  u.searchParams.set('utm_source', source)
  u.searchParams.set('utm_medium', 'share')
  u.searchParams.set('utm_campaign', campaign)
  return u.toString()
}
