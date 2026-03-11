import { defineField } from 'sanity'

/**
 * Creates a localized string field with zh and en sub-fields
 * Use for short text fields like title, name, etc.
 */
export function localizedString(
  options: { name: string; title: string; description?: string }
): any[] {
  const { name, title, description } = options

  return [
    defineField({
      name: `${name}_zh`,
      title: `${title} (Chinese)`,
      type: 'string',
      description: description ? `${description} (Chinese version)` : undefined,
    }),
    defineField({
      name: `${name}_en`,
      title: `${title} (English)`,
      type: 'string',
      description: description ? `${description} (English version)` : undefined,
    }),
  ]
}

/**
 * Creates a localized text field with zh and en sub-fields
 * Use for longer text fields like description, bio, etc.
 */
export function localizedText(
  options: { name: string; title: string; description?: string }
): any[] {
  const { name, title, description } = options

  return [
    defineField({
      name: `${name}_zh`,
      title: `${title} (Chinese)`,
      type: 'text',
      description: description ? `${description} (Chinese version)` : undefined,
    }),
    defineField({
      name: `${name}_en`,
      title: `${title} (English)`,
      type: 'text',
      description: description ? `${description} (English version)` : undefined,
    }),
  ]
}

/**
 * Creates a localized array of blocks field with zh and en sub-fields
 * Use for rich text fields like bio (array of blocks)
 */
export function localizedRichText(
  options: { name: string; title: string; description?: string }
): any[] {
  const { name, title, description } = options

  return [
    defineField({
      name: `${name}_zh`,
      title: `${title} (Chinese)`,
      type: 'array',
      of: [{ type: 'block' }],
      description: description ? `${description} (Chinese version)` : undefined,
    }),
    defineField({
      name: `${name}_en`,
      title: `${title} (English)`,
      type: 'array',
      of: [{ type: 'block' }],
      description: description ? `${description} (English version)` : undefined,
    }),
  ]
}
