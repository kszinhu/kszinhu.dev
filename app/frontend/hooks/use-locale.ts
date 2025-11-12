import { useMemo } from "react"

/**
 * Hook to get the current locale from the document's html lang attribute
 * (set by Rails) or fallback to browser's language
 */
export function useLocale(): string {
  const locale = useMemo(() => {
    const htmlLang = document.documentElement.lang
    if (htmlLang) return htmlLang

    const browserLang = navigator.language
    return browserLang
  }, [])

  return locale
}
