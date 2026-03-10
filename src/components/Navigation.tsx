'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navigation() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.showMe'), href: '/show-me' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.publications'), href: '/publications' },
    { name: t('nav.media'), href: '/media' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.experience'), href: '/experience' },
    { name: t('nav.awards'), href: '/awards' },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">My Portfolio</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <MobileMenu navItems={navItems} pathname={pathname} language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ navItems, pathname, language, setLanguage }: {
  navItems: { name: string; href: string }[],
  pathname: string,
  language: 'en' | 'zh',
  setLanguage: (lang: 'en' | 'zh') => void
}) {
  return (
    <div className="relative">
      <details className="relative">
        <summary className="cursor-pointer list-none p-2 text-gray-500 hover:text-gray-700">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 text-sm ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
            >
              {language === 'en' ? '切换到中文' : 'Switch to English'}
            </button>
          </div>
        </div>
      </details>
    </div>
  )
}
