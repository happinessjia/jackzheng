'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getFeatured, urlFor } from '@/lib/sanity'

type FeaturedData = {
  projects: any[]
  showMeItems: any[]
  publications: any[]
  mediaReports: any[]
  awards: any[]
  about: any[]
  employment: any[]
  education: any[]
}

function FeaturedCard({ item, type, t }: { item: any; type: string; t: (key: any) => string }) {
  const { language } = useLanguage()
  // about 类型用 avatar 字段，其他类型用 image 字段
  const imageObj = type === 'about' ? item.avatar : item.image
  const hasImage = imageObj?.asset || (imageObj && typeof imageObj === 'string')

  const getLink = () => {
    switch (type) {
      case 'project':
        return item.link || '#'
      case 'showMe':
        return '/show-me'
      case 'publication':
        return item.link || '#'
      case 'mediaReport':
        return item.link || '#'
      case 'award':
        return '/awards'
      case 'about':
        return '/about'
      case 'employment':
        return '/experience'
      case 'education':
        return '/experience'
      default:
        return '#'
    }
  }

  const getViewText = () => {
    switch (type) {
      case 'project':
        return t('home.viewProject')
      case 'publication':
        return t('home.viewPublication')
      case 'mediaReport':
        return t('home.viewMedia')
      default:
        return ''
    }
  }

  const getLocalizedTitle = (item: any) => {
    // Sanity localizedString() creates flat fields: name_zh, name_en, title_zh, etc.
    const primary = `_${language}`
    const fallback = language === 'zh' ? '_en' : '_zh'
    if (item[`name${primary}`] || item[`name${fallback}`]) {
      return item[`name${primary}`] || item[`name${fallback}`] || ''
    }
    if (item[`title${primary}`] || item[`title${fallback}`]) {
      return item[`title${primary}`] || item[`title${fallback}`] || ''
    }
    if (item[`school${primary}`] || item[`school${fallback}`]) {
      return item[`school${primary}`] || item[`school${fallback}`] || ''
    }
    if (item[`company${primary}`] || item[`company${fallback}`]) {
      return item[`company${primary}`] || item[`company${fallback}`] || ''
    }
    return ''
  }

  const getLocalizedDescription = (item: any) => {
    // Handle rich text arrays (Sanity stores localized rich text as arrays)
    const getTextFromRichText = (rt: any) => {
      if (!rt) return ''
      if (typeof rt === 'string') return rt
      if (Array.isArray(rt)) {
        return rt.map((block: any) => {
          if (block.children) {
            return block.children.map((child: any) => child.text || '').join('')
          }
          return ''
        }).join(' ')
      }
      return ''
    }

    const primary = language
    const fallback = language === 'zh' ? 'en' : 'zh'
    if (item[`bio_${primary}`] || item[`bio_${fallback}`]) {
      return getTextFromRichText(item[`bio_${primary}`] || item[`bio_${fallback}`])
    }
    if (item[`description_${primary}`] || item[`description_${fallback}`]) {
      return getTextFromRichText(item[`description_${primary}`] || item[`description_${fallback}`])
    }
    return ''
  }

  return (
    <Link
      href={getLink()}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {hasImage && (
        <div className="relative h-48 w-full overflow-hidden">
          {typeof imageObj === 'string' ? (
            <img
              src={imageObj}
              alt={getLocalizedTitle(item)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <Image
              src={urlFor(imageObj).width(400).height(300).url()}
              alt={getLocalizedTitle(item)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {getLocalizedTitle(item)}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {getLocalizedDescription(item)}
        </p>
        {getViewText() && (
          <span className="text-blue-600 text-sm font-medium group-hover:underline">
            {getViewText()}
          </span>
        )}
      </div>
    </Link>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const [featured, setFeatured] = useState<FeaturedData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data = await getFeatured()
        setFeatured(data)
      } catch (error) {
        console.error('Error fetching featured:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const allFeatured = featured ? [
    ...featured.about.map((item: any) => ({ item, type: 'about' })),
    ...featured.projects.map((item: any) => ({ item, type: 'project' })),
    ...featured.showMeItems.map((item: any) => ({ item, type: 'showMe' })),
    ...featured.publications.map((item: any) => ({ item, type: 'publication' })),
    ...featured.mediaReports.map((item: any) => ({ item, type: 'mediaReport' })),
    ...featured.awards.map((item: any) => ({ item, type: 'award' })),
    ...featured.employment.map((item: any) => ({ item, type: 'employment' })),
    ...featured.education.map((item: any) => ({ item, type: 'education' })),
  ] : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : allFeatured.length > 0 ? (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('home.featured')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFeatured.map(({ item, type }) => (
              <FeaturedCard key={item._id} item={item} type={type} t={t} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-500 text-lg">{t('home.featured.empty')}</p>
        </div>
      )}
    </div>
  )
}
