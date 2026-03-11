import { defineField, defineType } from 'sanity'
import { localizedString } from './localizedTypes'

export default defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    ...localizedString({ name: 'name', title: 'Skill Name' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming', value: 'programming' },
          { title: 'Framework', value: 'framework' },
          { title: 'Tool', value: 'tool' },
          { title: 'Language', value: 'language' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'level',
      title: 'Proficiency Level',
      type: 'number',
      description: 'Enter a number from 1-100',
      validation: (Rule) => Rule.min(1).max(100),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Optional icon name for display',
    }),
  ],
})
