'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export const getSettings = async () => {
  try {
    return await payload.findGlobal({
      slug: "settings",
    })

  } catch (error: any) {
    throw new Error(error)
  }
}