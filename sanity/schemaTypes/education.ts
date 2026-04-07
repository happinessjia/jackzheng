import { defineField, defineType } from 'sanity'
import { localizedString, localizedRichText } from './localizedTypes'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    ...localizedString({ name: 'school', title: 'School' }),
    ...localizedString({ name: 'degree', title: 'Degree' }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
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
