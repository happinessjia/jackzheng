import { defineField, defineType } from 'sanity'
import { localizedString, localizedRichText } from './localizedTypes'

export default defineType({
  name: 'publication',
  title: 'Publications',
  type: 'document',
  fields: [
    ...localizedString({ name: 'title', title: 'Title' }),
    ...localizedString({ name: 'authors', title: 'Authors' }),
    ...localizedString({ name: 'journal', title: 'Journal/Conference' }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    ...localizedRichText({ name: 'description', title: 'Description' }),
    defineField({
      name: 'favorite',
      title: 'Favorite',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
