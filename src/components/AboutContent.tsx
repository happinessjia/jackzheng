'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { urlFor } from '@/sanity/lib/client'
import { getLocalizedField } from '@/lib/i18n-content'
import { PortableText } from '@portabletext/react'

interface AboutContentProps {
  about: any
}

export default function AboutContent({ about }: AboutContentProps) {
  const { t, language } = useLanguage()

  if (!about) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('about.title')}</h1>
        <p className="text-gray-600">{t('about.noInfo')}</p>
      </div>
    )
  }

  const name = getLocalizedField(about, 'name', language)
  const title = getLocalizedField(about, 'title', language)
  const location = getLocalizedField(about, 'location', language)
  const bio = language === 'zh' ? about.bio_zh : about.bio_en

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('about.title')}</h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {about.avatar && (
            <div className="flex-shrink-0">
              <img
                src={urlFor(about.avatar).width(200).height(200).url()}
                alt={name || 'Name'}
                className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0"
              />
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {name || 'Name'}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {title || 'Title'}
            </p>

            {location && (
              <p className="text-gray-500 mb-4">
                <span className="font-medium">{t('about.location')}:</span> {location}
              </p>
            )}

            {about.email && (
              <p className="text-gray-500 mb-4">
                <span className="font-medium">{t('about.email')}:</span>{' '}
                <a href={`mailto:${about.email}`} className="text-blue-600 hover:underline">
                  {about.email}
                </a>
              </p>
            )}
          </div>
        </div>

        {bio && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('about.biography')}</h3>
            <div className="prose max-w-none text-gray-700">
              <PortableText value={bio} />
            </div>
          </div>
        )}

        {about.socialLinks && about.socialLinks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('about.socialLinks')}</h3>
            <div className="flex gap-4">
              {about.socialLinks.map((link: any, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
