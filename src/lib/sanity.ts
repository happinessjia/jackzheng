/* eslint-disable @typescript-eslint/no-explicit-any */
import { client, isSanityConfigured } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

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

// Helper function to safely fetch data
async function safeFetch<T>(query: string, params?: any): Promise<T> {
  if (!isSanityConfigured()) {
    console.warn('Sanity is not configured. Returning empty data.')
    return [] as any
  }
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return [] as any
  }
}

// Fetch functions for each content type
export async function getAbout() {
  return safeFetch<any>(`*[_type == "about"][0]`)
}

export async function getShowMe() {
  return safeFetch<any[]>(`*[_type == "showMe"] | order(order asc)`)
}

export async function getPublications() {
  return safeFetch<any[]>(`*[_type == "publication"] | order(year desc)`)
}

export async function getMediaReports() {
  return safeFetch<any[]>(`*[_type == "mediaReport"] | order(date desc)`)
}

export async function getProjects() {
  return safeFetch<any[]>(`*[_type == "project"] | order(date desc)`)
}

export async function getProject(slug: string) {
  return safeFetch<any>(`*[_type == "project" && slug.current == $slug][0]`, { slug })
}

export async function getEmployment() {
  return safeFetch<any[]>(`*[_type == "employment"] | order(startDate desc)`)
}

export async function getEducation() {
  return safeFetch<any[]>(`*[_type == "education"] | order(startDate desc)`)
}

export async function getAwards() {
  return safeFetch<any[]>(`*[_type == "award"] | order(date desc)`)
}

export async function getSkills() {
  return safeFetch<any[]>(`*[_type == "skill"]`)
}
