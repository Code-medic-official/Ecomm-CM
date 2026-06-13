'use server'

import { zernio } from '../zernio'

/**
 * @Step_1
 * #### Create a Profile
 * Profiles group your social accounts together.
 * For example, you might have a "Personal Brand" profile with your Twitter and LinkedIn, and a "Company" profile with your business accounts.
 */

const createProfile = async () => {
  const { profile } = await zernio.profiles.createProfile({
    name: 'My First Profile',
    description: 'Testing the Zernio API',
  })

  console.log('Profile created:', profile._id)
}

/**
 * @Step_2
 * Connect a Social Account
 * Now connect a social media account to your profile.
 * ! This uses OAuth, so it will redirect to the platform for authorization.
 */
const connectAccount = async () => {
  const { authUrl } = await zernio.connect.getConnectUrl({
    platform: 'twitter',
    profileId: 'prof_abc123',
  })

  // Redirect user to this URL to authorize
  console.log('Open this URL:', authUrl)
}

/**
 * @Step_3
 * Get Your Connected Accounts
 * After connecting, list your accounts to get the account ID:
 */
const getConnectedAccounts = async () => {
  const { accounts } = await zernio.accounts.listAccounts()

  for (const account of accounts) {
    console.log(`${account.platform}: ${account._id}`)
  }

  // Save the account _id - you need it to create posts.
}

/**
 * @Create_Post
 * 1. To save a post without publishing or scheduling, omit both `scheduledFor` and `publishNow`:
 * 2. To publish right now instead of scheduling, use `publishNow: true`
 *
 * #### Media
 * Include the publicUrl in your post:
 * ```js
 * mediaItems: [
 *     { url: publicUrl, type: 'image' }
 *   ]
 * ```
 */
const createPost = async () => {
  const { post } = await zernio.posts.createPost({
    content: 'Hello world! This is my first post from the Zernio API',
    // Media
    mediaItems: [{ url: '', type: 'image' }],
    // Choose one.
    scheduledFor: '2024-01-16T12:00:00', // ? Schedule Post.
    publishNow: true, // ? Immediate publishing
    timezone: 'America/New_York',
    platforms: [
      { platform: 'twitter', accountId: 'acc_twitter123' },
      // ? If you wanna post to multiple platforms.
      // { platform: 'linkedin', accountId: 'acc_linkedin456' },
      // { platform: 'bluesky', accountId: 'acc_bluesky789' },
    ],
  })

  console.log('Post scheduled:', post._id)
}
