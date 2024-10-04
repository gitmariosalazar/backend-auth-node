import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters"
    })
})


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters"
    })
})

export const messageSchema = z.object({
  from: z
    .string({
      required_error: "From email is required",
    })
    .email({
      message: "Invalid email format for 'from' field",
    }),
  to: z
    .string({
      required_error: "To email is required",
    })
    .email({
      message: "Invalid email format for 'to' field",
    }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, {
      message: "Name cannot be empty",
    }),
  message: z
    .string({
      required_error: "Message is required",
    })
    .min(1, {
      message: "Message cannot be empty",
    }),
  subject: z
    .string({
      required_error: "Subject is required",
    })
    .min(1, {
      message: "Subject cannot be empty",
    }),
});