import { getPublications } from '@/lib/sanity'
import PublicationsContent from '@/components/PublicationsContent'

export default async function PublicationsPage() {
  const publications = await getPublications()

  return <PublicationsContent publications={publications} />
}
