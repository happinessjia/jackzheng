import { getProjects } from '@/lib/sanity'
import ProjectsContent from '@/components/ProjectsContent'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return <ProjectsContent projects={projects} />
}
