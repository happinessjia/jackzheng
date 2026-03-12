'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { urlFor } from '@/sanity/lib/client'
import { fileUrl } from '@/lib/sanity'
import { getLocalizedField } from '@/lib/i18n-content'
import { PortableText } from '@portabletext/react'

interface ProjectsContentProps {
  projects: any[]
}

export default function ProjectsContent({ projects }: ProjectsContentProps) {
  const { t, language } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('projects.title')}</h1>

      {projects.length === 0 ? (
        <p className="text-gray-600">{t('projects.noAvailable')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project: any) => {
            const title = getLocalizedField(project, 'title', language)
            const description = getLocalizedField(project, 'description', language)

            return (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative bg-gray-100 flex items-center justify-center min-h-[300px]">
                  {project.image ? (
                    <img
                      src={urlFor(project.image).width(1200).height(800).url()}
                      alt={title}
                      className="w-full h-auto max-h-[600px] object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center py-16">
                      <span className="text-gray-400">{t('projects.noImage')}</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                  </h2>
                  {description && (
                    <div className="text-gray-600 text-sm mb-3">
                      <PortableText value={description} />
                    </div>
                  )}
                  {project.date && (
                    <p className="text-gray-500 text-sm">{project.date}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.downloads && project.downloads.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">{t('projects.downloads') || 'Downloads'}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.downloads.map((download: any, i: number) => (
                          <a
                            key={i}
                            href={fileUrl(download.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded hover:bg-blue-100 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {download.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-600 hover:underline"
                    >
                      {t('projects.viewProject')}
                    </a>
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
