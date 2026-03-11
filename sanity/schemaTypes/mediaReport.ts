import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './localizedTypes'

export default defineType({
  name: 'mediaReport',
  title: 'Media Reports',
  type: 'document',
  fields: [
    ...localizedString({ name: 'title', title: 'Title' }),
    defineField({
      name: 'source',
      title: 'Source/Media',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    ...localizedText({ name: 'description', title: 'Description' }),
  ],
})
