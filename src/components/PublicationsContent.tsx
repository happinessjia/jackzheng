'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedField } from '@/lib/i18n-content'
import { PortableText } from '@portabletext/react'

interface PublicationsContentProps {
  publications: any[]
}

export default function PublicationsContent({ publications }: PublicationsContentProps) {
  const { t, language } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {publications.length === 0 ? (
        <p className="text-gray-600">{t('publications.noAvailable')}</p>
      ) : (
        <div className="space-y-6">
          {publications.map((pub: any) => {
            const title = getLocalizedField(pub, 'title', language)
            const authors = getLocalizedField(pub, 'authors', language)
            const journal = getLocalizedField(pub, 'journal', language)
            const description = getLocalizedField(pub, 'description', language)

            return (
              <div key={pub._id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">{t('publications.authors')}:</span> {authors}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">{t('publications.journal')}:</span> {journal}
                </p>
                {pub.year && (
                  <p className="text-gray-500 mb-2">
                    <span className="font-medium">{t('publications.year')}:</span> {pub.year}
                  </p>
                )}
                {description && (
                  <div className="text-gray-700 mb-4">
                    <PortableText value={description} />
                  </div>
                )}
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {t('publications.view')}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
