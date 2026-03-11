import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './localizedTypes'

export default defineType({
  name: 'employment',
  title: 'Employment',
  type: 'document',
  fields: [
    ...localizedString({ name: 'company', title: 'Company' }),
    ...localizedString({ name: 'position', title: 'Position' }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'Leave empty if current position',
    }),
    ...localizedText({ name: 'description', title: 'Description' }),
    ...localizedString({ name: 'location', title: 'Location' }),
  ],
})
