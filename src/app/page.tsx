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
  const hasImage = item.image?.asset || (item.image && typeof item.image === 'string')

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
    // Check different field names based on content type
    if (item.name?.zh || item.name?.en) {
      return item.name?.zh || item.name?.en || ''
    }
    if (item.title?.zh || item.title?.en) {
      return item.title?.zh || item.title?.en || ''
    }
    if (item.school?.zh || item.school?.en) {
      return item.school?.zh || item.school?.en || ''
    }
    if (item.company?.zh || item.company?.en) {
      return item.company?.zh || item.company?.en || ''
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

    if (item.bio?.zh || item.bio?.en) {
      return getTextFromRichText(item.bio?.zh || item.bio?.en)
    }
    if (item.description?.zh || item.description?.en) {
      return getTextFromRichText(item.description?.zh || item.description?.en)
    }
    if (item.bio_zh || item.bio_en) {
      return getTextFromRichText(item.bio_zh || item.bio_en)
    }
    if (item.description_zh || item.description_en) {
      return getTextFromRichText(item.description_zh || item.description_en)
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
          {typeof item.image === 'string' ? (
            <img
              src={item.image}
              alt={getLocalizedTitle(item)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <Image
              src={urlFor(item.image).width(400).height(300).url()}
              alt={getLocalizedTitle(item)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
      )}
      <div className="p-5">
        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
          {type === 'project' && t('home.featured.projects')}
          {type === 'showMe' && t('home.featured.showMe')}
          {type === 'publication' && t('home.featured.publications')}
          {type === 'mediaReport' && t('home.featured.mediaReports')}
          {type === 'award' && t('home.featured.awards')}
          {type === 'about' && t('home.featured.about')}
          {type === 'employment' && t('home.featured.employment')}
          {type === 'education' && t('home.featured.education')}
        </span>
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

function FeaturedSection({ title, items, type, t }: { title: string; items: any[]; type: string; t: (key: any) => string }) {
  if (!items || items.length === 0) return null

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500 inline-block">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FeaturedCard key={item._id} item={item} type={type} t={t} />
        ))}
      </div>
    </section>
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

  const hasAnyFeatured = featured && (
    (featured.projects?.length ?? 0) > 0 ||
    (featured.showMeItems?.length ?? 0) > 0 ||
    (featured.publications?.length ?? 0) > 0 ||
    (featured.mediaReports?.length ?? 0) > 0 ||
    (featured.awards?.length ?? 0) > 0 ||
    (featured.about?.length ?? 0) > 0 ||
    (featured.employment?.length ?? 0) > 0 ||
    (featured.education?.length ?? 0) > 0
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : hasAnyFeatured ? (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('home.featured')}
          </h2>
          {featured?.projects?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.projects')}
              items={featured.projects}
              type="project"
              t={t}
            />
          )}
          {featured?.showMeItems?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.showMe')}
              items={featured.showMeItems}
              type="showMe"
              t={t}
            />
          )}
          {featured?.publications?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.publications')}
              items={featured.publications}
              type="publication"
              t={t}
            />
          )}
          {featured?.mediaReports?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.mediaReports')}
              items={featured.mediaReports}
              type="mediaReport"
              t={t}
            />
          )}
          {featured?.awards?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.awards')}
              items={featured.awards}
              type="award"
              t={t}
            />
          )}
          {featured?.about?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.about')}
              items={featured.about}
              type="about"
              t={t}
            />
          )}
          {featured?.employment?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.employment')}
              items={featured.employment}
              type="employment"
              t={t}
            />
          )}
          {featured?.education?.length > 0 && (
            <FeaturedSection
              title={t('home.featured.education')}
              items={featured.education}
              type="education"
              t={t}
            />
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-500 text-lg">{t('home.featured.empty')}</p>
        </div>
      )}
    </div>
  )
}
