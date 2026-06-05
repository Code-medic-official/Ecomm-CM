import { HEADER_FONTS, SYSTEM_FONTS } from '@/fonts/fonts'
import { GlobalConfig } from 'payload'

export const SettingsGlobal: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      name: 'headingFont',
      type: 'select',
      options: Object.keys(HEADER_FONTS).map((f) => ({ label: f, value: f })),
      defaultValue: 'spaceGroteskFont',
      admin: {
        description: "Font that will be applied headings."
      }
    },
    {
      name: 'systemFont',
      type: 'select',
      options: Object.keys(SYSTEM_FONTS).map((f) => ({ label: f, value: f })),
      defaultValue: 'poppinsFont',
            admin: {
        description: "General font applied throughout the app."
      }

    },
    {name:"logo", type: "upload", relationTo: "media",}
  ],
}
