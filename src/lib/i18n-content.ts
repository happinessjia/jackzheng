/**
 * Helper functions for accessing localized content from Sanity
 * Fields in Sanity are stored as {fieldName}_zh and {fieldName}_en
 */

type Language = 'zh' | 'en'

/**
 * Get a localized field value from a Sanity document
 * @param data - The Sanity document object
 * @param fieldName - The base field name (without _zh or _en suffix)
 * @param language - The language code ('zh' or 'en')
 * @returns The localized field value, or the other language's value if the requested language is empty
 */
export function getLocalizedField(
  data: Record<string, any> | null | undefined,
  fieldName: string,
  language: Language
): any {
  if (!data) return ''

  const zhField = `${fieldName}_zh`
  const enField = `${fieldName}_en`

  const zhValue = data[zhField]
  const enValue = data[enField]

  // Return the value for the requested language
  if (language === 'zh') {
    // If Chinese is requested but empty, fallback to English
    return zhValue || enValue || ''
  } else {
    // If English is requested but empty, fallback to Chinese
    return enValue || zhValue || ''
  }
}
