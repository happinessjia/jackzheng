import { getShowMe } from '@/lib/sanity'
import ShowMeContent from '@/components/ShowMeContent'

export default async function ShowMePage() {
  const items = await getShowMe()

  return <ShowMeContent items={items} />
}
