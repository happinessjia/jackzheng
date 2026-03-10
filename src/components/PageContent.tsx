'use client'

import { useLanguage, TranslationKey } from '@/contexts/LanguageContext'
import { ReactNode } from 'react'

export function PageContent({ children }: { children: (t: (key: TranslationKey) => string) => ReactNode }) {
  const { t } = useLanguage()
  return <>{children(t)}</>
}

export function useTranslation() {
  const { t } = useLanguage()
  return t
}
