import { getAwards } from '@/lib/sanity'
import AwardsContent from '@/components/AwardsContent'

export default async function AwardsPage() {
  const awards = await getAwards()

  return <AwardsContent awards={awards} />
}
