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
            {
              name: 'description',
              type: 'richText',
              admin: {
                description: 'Describe broadly what your shop is about.',
              },
            },
            {
              name: 'contacts',
              type: 'group',
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  unique: true,
                  defaultValue: 'codeMedic2@gmail.com',
                },
                {
                  name: 'phone',
                  type: 'text',
                  unique: true,
                  required: true,
                },
                // {
                //   name: 'CTA_Object',
                //   type: 'select',
                //   options: ['Globe3D', 'World_map', 'GitHub_Globe'],
                //   defaultValue: 'Globe3D',
                // },
                {
                  name: 'socialMedia',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'site',
                      type: 'select',
                      options: ['twitter', 'facebook', 'instagram', 'youtube', 'tiktok', 'reddit'],
                      required: true,
                    },
                    { name: 'link', type: 'text', required: true },
                    { name: 'displayText', type: 'text', required: true },
                    { name: 'previewUrl', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
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
      ],
    },
  ],
}
