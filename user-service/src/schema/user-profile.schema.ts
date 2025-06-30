import { z } from "zod"; 

const ethiopianPhoneRegex = /^(?:\+251|251|0)?[79]\d{8}$/;
const userProfileSchema = z.object({
    first_name: z.string().trim().min(2, "first name should be atleast two characters"),
    last_name: z.string().trim().min(2, "last name should be atleast two characters"),
    bio: z.string().trim().min(10, "bio should be atleast 10 characters").optional(),
    phone_number: z.string().regex(ethiopianPhoneRegex, { message: 'Invalid Ethiopian phone number (must start with 07 or 09)'}).transform((val) => {
      if (val.startsWith('0')) return '+251' + val.slice(1);
      if (val.startsWith('251')) return '+' + val;
      return val;
    })
})

const userQuerySchema = z.object({
  search: z.string().optional(),
  role:z.enum(['attendee', 'organizer', 'admin']).optional(),
  sortBy: z.enum(['createdAt', 'first_name', 'last_name']).optional(),
  order: z.enum(['asc', 'desc', 'ASC', 'DESC']).optional(),
})

const userRoleUpdateSchema = z.object({
  role:z.enum(['attendee', 'organizer', 'admin']).optional(),
})

const userProfileUpadetSchema = z.object({
  first_name: z.string().trim().min(2, "first name should be atleast two characters").optional(),
    last_name: z.string().trim().min(2, "last name should be atleast two characters").optional(),
    bio: z.string().trim().min(10, "bio should be atleast 10 characters").optional(),
    phone_number: z.string().regex(ethiopianPhoneRegex, { message: 'Invalid Ethiopian phone number (must start with 07 or 09)'}).transform((val) => {
      if (val.startsWith('0')) return '+251' + val.slice(1);
      if (val.startsWith('251')) return '+' + val;
      return val;
    }).optional(),
})

export { userProfileSchema, userQuerySchema, userRoleUpdateSchema, userProfileUpadetSchema }