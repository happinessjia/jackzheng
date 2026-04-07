'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedField } from '@/lib/i18n-content'
import { PortableText } from '@portabletext/react'

interface MediaContentProps {
  media: any[]
}

export default function MediaContent({ media }: MediaContentProps) {
  const { t, language } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {media.length === 0 ? (
        <p className="text-gray-600">{t('media.noAvailable')}</p>
      ) : (
        <div className="space-y-6">
          {media.map((item: any) => {
            const title = getLocalizedField(item, 'title', language)
            const description = getLocalizedField(item, 'description', language)

            return (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">{t('media.source')}:</span> {item.source}
                </p>
                {item.date && (
                  <p className="text-gray-500 mb-2">
                    <span className="font-medium">{t('media.date')}:</span>{' '}
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
                {description && (
                  <div className="text-gray-700 mb-4">
                    <PortableText value={description} />
                  </div>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {t('media.readMore')}
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
