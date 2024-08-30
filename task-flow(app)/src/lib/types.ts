import { z } from 'zod'

export const WorkflowFormSchema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
  })

  export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'
  
  export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?: boolean
  }