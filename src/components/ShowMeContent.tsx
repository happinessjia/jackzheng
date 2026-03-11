'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { urlFor } from '@/sanity/lib/client'
import { getLocalizedField } from '@/lib/i18n-content'

interface ShowMeContentProps {
  items: any[]
}

export default function ShowMeContent({ items }: ShowMeContentProps) {
  const { t, language } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('showMe.title')}</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">{t('showMe.noItems')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => {
            const title = getLocalizedField(item, 'title', language)
            const description = getLocalizedField(item, 'description', language)

            return (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {item.mediaType === 'video' ? (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {item.videoUrl ? (
                      <video
                        src={item.videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">{t('showMe.noVideo')}</span>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square relative">
                    {item.image ? (
                      <img
                        src={urlFor(item.image).width(400).height(400).url()}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">{t('showMe.noImage')}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title || t('showMe.untitled')}
                  </h3>
                  {description && (
                    <p className="text-gray-600 text-sm">{description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
