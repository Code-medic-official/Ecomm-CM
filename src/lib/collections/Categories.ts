import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { LUCIDE_ICON_NAMES } from '../constants'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'refCategory',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
    },
    {
      name: 'icon',
      type: 'select',
      options: LUCIDE_ICON_NAMES,
    },
    slugField({
      position: undefined,
    }),
  ],
}
