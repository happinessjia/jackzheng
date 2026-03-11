import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './localizedTypes'

export default defineType({
  name: 'showMe',
  title: 'Show Me',
  type: 'document',
  fields: [
    ...localizedString({ name: 'title', title: 'Title' }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL to video file or embed URL',
    }),
    ...localizedText({ name: 'description', title: 'Description' }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
