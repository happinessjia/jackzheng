import { getEmployment, getEducation } from '@/lib/sanity'
import ExperienceContent from '@/components/ExperienceContent'

export default async function ExperiencePage() {
  const employment = await getEmployment()
  const education = await getEducation()

  return <ExperienceContent employment={employment} education={education} />
}
