import { defineField, defineType } from 'sanity'
import { localizedString, localizedRichText } from './localizedTypes'

export default defineType({
  name: 'award',
  title: 'Awards',
  type: 'document',
  fields: [
    ...localizedString({ name: 'title', title: 'Title' }),
    ...localizedString({ name: 'issuer', title: 'Issuer' }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
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
