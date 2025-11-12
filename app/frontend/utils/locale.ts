export const AVAILABLE_LOCALES = ["en", "pt", "en-US", "pt-BR"] as const
export type Locale = (typeof AVAILABLE_LOCALES)[number]

export function getCurrentLocale() {
  const urlParams = new URLSearchParams(window.location.search)
  const langParam = urlParams.get("lang") || urlParams.get("locale")
  if (langParam) {
    return langParam
  }

  const htmlLang = document.documentElement.lang
  if (htmlLang) {
    return htmlLang
  }

  return navigator.language
}

export function changeLocale(locale: Locale) {
  const url = new URL(window.location.href)
  url.searchParams.set("lang", locale)
  window.location.href = url.toString()
}

export function clearLocaleParam() {
  const url = new URL(window.location.href)
  url.searchParams.delete("lang")
  url.searchParams.delete("locale")
  window.location.href = url.toString()
}

export function isValidLocale(locale: Locale) {
  const normalizedLocale = locale.toLowerCase()
  return AVAILABLE_LOCALES.some((l) => l.toLowerCase() === normalizedLocale)
}

export function normalizeLocale(locale: Locale): string {
  if (locale.startsWith("pt")) return "pt"
  if (locale.startsWith("en")) return "en"
  return locale
}
