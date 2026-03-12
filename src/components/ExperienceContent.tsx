'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedField } from '@/lib/i18n-content'
import { PortableText } from '@portabletext/react'

interface ExperienceContentProps {
  employment: any[]
  education: any[]
}

export default function ExperienceContent({ employment, education }: ExperienceContentProps) {
  const { t, language } = useLanguage()

  const formatDate = (dateStr: string | undefined, endDate: string | undefined) => {
    if (!dateStr) return endDate || t('experience.present')
    const startDate = new Date(dateStr)
    const end = endDate || t('experience.present')
    if (language === 'zh') {
      return `${startDate.getFullYear()}年${startDate.getMonth() + 1}月 - ${end}`
    }
    return `${startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} - ${end}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12">{t('experience.title')}</h1>

      {/* Employment Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">{t('experience.employment')}</h2>

        {employment.length === 0 ? (
          <p className="text-gray-600">{t('experience.noEmployment')}</p>
        ) : (
          <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
            {employment.map((job: any) => {
              const position = getLocalizedField(job, 'position', language)
              const company = getLocalizedField(job, 'company', language)
              const description = getLocalizedField(job, 'description', language)
              const location = getLocalizedField(job, 'location', language)

              return (
                <div key={job._id} className="relative pl-8">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {position}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">{company}</p>
                    <p className="text-gray-500 text-sm mb-3">
                      {formatDate(job.startDate, job.endDate)}
                    </p>
                    {location && (
                      <p className="text-gray-500 text-sm mb-3">{location}</p>
                    )}
                    {description && (
                      <div className="text-gray-700">
                        <PortableText value={description} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">{t('experience.education')}</h2>

        {education.length === 0 ? (
          <p className="text-gray-600">{t('experience.noEducation')}</p>
        ) : (
          <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
            {education.map((edu: any) => {
              const degree = getLocalizedField(edu, 'degree', language)
              const school = getLocalizedField(edu, 'school', language)
              const description = getLocalizedField(edu, 'description', language)

              return (
                <div key={edu._id} className="relative pl-8">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {degree}
                    </h3>
                    <p className="text-green-600 font-medium mb-2">{school}</p>
                    {edu.field && (
                      <p className="text-gray-600 mb-2">{edu.field}</p>
                    )}
                    <p className="text-gray-500 text-sm">
                      {formatDate(edu.startDate, edu.endDate)}
                    </p>
                    {description && (
                      <div className="text-gray-700 mt-3">
                        <PortableText value={description} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
