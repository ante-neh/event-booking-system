import { z } from 'zod'

const userSchema = z.object({
    email: z.string().email("invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters"),
    role: z.enum(["admin", "organizer", "attendee"]).optional(),
})

export { userSchema }