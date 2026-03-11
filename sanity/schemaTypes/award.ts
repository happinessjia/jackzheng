import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './localizedTypes'

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
    ...localizedText({ name: 'description', title: 'Description' }),
  ],
})
