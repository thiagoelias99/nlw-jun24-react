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

export interface ITrip {
  id: string
  destination: string
  starts_at: Date
  ends_at: Date
  owner_name: string
  owner_email: string
  is_confirmed: boolean
  emails_to_invite: ITripGuests[]
}

interface ITripGuests {
  email: string
  name: string
  is_confirmed: boolean
}