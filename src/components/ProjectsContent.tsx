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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row"
              >
                <div className="w-full md:w-1/2 lg:w-3/5 bg-gray-100 flex items-center justify-center p-4">
                  {project.image ? (
                    <img
                      src={urlFor(project.image).width(1200).height(1).url()}
                      alt={title}
                      className="max-w-full max-h-[500px] w-auto h-auto object-contain"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-full flex items-center justify-center py-12">
                      <span className="text-gray-400">{t('projects.noImage')}</span>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-1/2 lg:w-2/5 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {title}
                  </h2>
                  {description && (
                    <div className="text-gray-600 mb-4">
                      <PortableText value={description} />
                    </div>
                  )}
                  {project.date && (
                    <p className="text-gray-500 text-sm mb-3">{project.date}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 5).map((tech: string, i: number) => (
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
                    <div className="mb-4">
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
                      className="inline-block mt-2 text-blue-600 hover:underline"
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
