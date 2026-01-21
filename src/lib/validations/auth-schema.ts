import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const registerSchema = loginSchema.extend({
  full_name: z.string().min(2, 'Nama minimal 2 karakter'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Password tidak cocok',
  path: ['confirm_password'],
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
