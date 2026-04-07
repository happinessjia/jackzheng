import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

type SanityImageSource = {
  _type: string
  asset: {
    _ref: string
    _type: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: SanityImageSource): any {
  if (!source || !source.asset) {
    return {
      width: () => ({ height: () => ({ url: () => '' }), url: () => '' }),
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source) as any
}

export function isSanityConfigured() {
  // Check at function call time, not module load time
  const currentProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
  return currentProjectId !== 'your-project-id' && currentProjectId.length > 0
}
