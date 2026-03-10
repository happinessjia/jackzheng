import { getAbout } from '@/lib/sanity'
import AboutContent from '@/components/AboutContent'

export default async function AboutPage() {
  const about = await getAbout()

  return <AboutContent about={about} />
}
