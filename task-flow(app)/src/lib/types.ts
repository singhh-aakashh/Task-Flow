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

  export const signupSchema = z.object({
    name:z.string().min(3),
    email:z.string().email(),
      password:z.string().min(4)
})

export const signinSchema = z.object({
  email:z.string().email(),
    password:z.string().min(4)
})