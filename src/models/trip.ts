import z from 'zod'

export const createTripDtoSchema = z.object({
  destination: z.string().min(1),
  starts_at: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
  ]),
  ends_at: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
  ]),
  owner_name: z.string().min(1),
  owner_email: z.string().email(),
  emails_to_invite: z.array(z.string().email()).default([]).optional(),
})

export type ICreateTripDto = z.infer<typeof createTripDtoSchema>