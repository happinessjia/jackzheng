import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './localizedTypes'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    ...localizedString({ name: 'title', title: 'Title' }),
    ...localizedText({ name: 'description', title: 'Description' }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'file', type: 'file', title: 'File' },
          ],
        },
      ],
    }),
  ],
})
