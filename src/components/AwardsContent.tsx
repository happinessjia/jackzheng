'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface AwardsContentProps {
  awards: any[]
}

export default function AwardsContent({ awards }: AwardsContentProps) {
  const { t, language } = useLanguage()

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (language === 'zh') {
      return `${date.getFullYear()}年${date.getMonth() + 1}月`
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12">{t('awards.title')}</h1>

      {/* Awards Section */}
      {awards.length === 0 ? (
        <p className="text-gray-600">{t('awards.noAwards')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award: any) => (
            <div
              key={award._id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {award.title}
              </h3>
              <p className="text-yellow-600 font-medium mb-2">
                {award.issuer}
              </p>
              {award.date && (
                <p className="text-gray-500 text-sm mb-3">
                  {formatDate(award.date)}
                </p>
              )}
              {award.description && (
                <p className="text-gray-700">{award.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
