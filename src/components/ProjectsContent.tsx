'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { urlFor } from '@/sanity/lib/client'
import { getLocalizedField } from '@/lib/i18n-content'

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => {
            const title = getLocalizedField(project, 'title', language)
            const description = getLocalizedField(project, 'description', language)

            return (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative">
                  {project.image ? (
                    <img
                      src={urlFor(project.image).width(400).height(300).url()}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">{t('projects.noImage')}</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {description}
                    </p>
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
