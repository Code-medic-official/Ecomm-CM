import { GlobalConfig } from 'payload'
import { eHeaderFonts, eSystemFonts } from '@/types/enums'

export const SettingsGlobal: GlobalConfig = {
  slug: 'settings',
  label: 'App Settings',
  admin: {
    description: 'Configure your shop settings here.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Design',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'headingFont',
                  type: 'select',
                  required: true,
                  options: Object.entries(eHeaderFonts).map(([label, value]) => ({ label, value })),
                  defaultValue: eHeaderFonts.SpaceGroteskFont,
                  admin: {
                    description: 'Font that will be applied headings.',
                  },
                },
                {
                  name: 'systemFont',
                  type: 'select',
                  required: true,
                  options: Object.entries(eSystemFonts).map(([label, value]) => ({ label, value })),
                  defaultValue: eSystemFonts.PoppinsFont,
                  admin: {
                    description: 'General font applied throughout the app.',
                  },
                },
              ],
            },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Fundamentals',
          fields: [
            {
              name: 'appName',
            label: 'Store name',
              type: 'text',
              required: true,
              defaultValue: 'CM Ecommerce',
              admin: {
                placeholder: 'Enter the name of your store...',
              },
            },
            { name: 'slogan', type: 'text', defaultValue: 'We have all u want!' },
            { name: 'description', type: 'richText', admin: {
              description: "Describe broadly what your shop is about."
            } },
          ],
        },
      ],
    },
  ],
}
