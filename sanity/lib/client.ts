import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

// Check if Sanity is properly configured
const isConfigured = projectId !== 'your-project-id' && projectId.length > 0

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

type SanityImageSource = {
  _type: string
  asset: {
    _ref: string
    _type: string
  }
}

export function urlFor(source: SanityImageSource) {
  if (!source || !source.asset) {
    return {
      width: () => ({ height: () => ({ url: () => '' }) }),
    }
  }
  return builder.image(source)
}

export function isSanityConfigured() {
  return isConfigured
}
