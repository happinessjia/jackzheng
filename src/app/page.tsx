'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Link href="/show-me" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('nav.showMe')}</h2>
          <p className="text-gray-600">{t('home.showMe.link')}</p>
        </Link>
        <Link href="/about" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('nav.about')}</h2>
          <p className="text-gray-600">{t('home.about.link')}</p>
        </Link>
        <Link href="/projects" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('nav.projects')}</h2>
          <p className="text-gray-600">{t('home.projects.link')}</p>
        </Link>
        <Link href="/publications" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('nav.publications')}</h2>
          <p className="text-gray-600">{t('home.publications.link')}</p>
        </Link>
        <Link href="/experience" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('nav.experience')}</h2>
          <p className="text-gray-600">{t('home.experience.link')}</p>
        </Link>
        <Link href="/awards" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('nav.awards')}</h2>
          <p className="text-gray-600">{t('home.awards.link')}</p>
        </Link>
      </div>

      {/* Featured Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.featured')}</h2>
        <p className="text-gray-600">
          {t('home.featured.description')}
        </p>
      </div>
    </div>
  )
}
