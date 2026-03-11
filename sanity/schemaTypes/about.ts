import { defineField, defineType } from 'sanity'
import { localizedString, localizedRichText } from './localizedTypes'

export default defineType({
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    ...localizedString({ name: 'name', title: 'Name' }),
    ...localizedString({ name: 'title', title: 'Title' }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    ...localizedRichText({ name: 'bio', title: 'Biography' }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    ...localizedString({ name: 'location', title: 'Location' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
})
