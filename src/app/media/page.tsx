import { getMediaReports } from '@/lib/sanity'
import MediaContent from '@/components/MediaContent'

export default async function MediaPage() {
  const media = await getMediaReports()

  return <MediaContent media={media} />
}
