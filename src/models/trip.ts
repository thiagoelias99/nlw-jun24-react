import z from 'zod'
import { setDoc, doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { fireStore } from '@/services/firebase'

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

export interface ITripGuests {
  email: string
  name: string
  is_confirmed: boolean
}

export interface ITrip {
  id: string
  destination: string
  startsAt: Date
  endsAt: Date
  ownerName: string
  ownerEmail: string
  isConfirmed: boolean
  guests: ITripGuests[]
}

export class Trip implements ITrip {
  id: string
  destination: string
  startsAt: Date
  endsAt: Date
  ownerName: string
  ownerEmail: string
  isConfirmed: boolean
  guests: ITripGuests[]

  constructor(data: ITrip) {
    Object.assign(this, data)
  }

  static async fromFirestore(tripId: string): Promise<Trip | undefined> {
    const tripDoc = doc(fireStore, 'trips', tripId)
    const tripSnapshot = await getDoc(tripDoc)

    if (tripSnapshot.exists()) {
      const trip = new Trip({
        id: tripSnapshot.id,
        destination: tripSnapshot.data().destination,
        startsAt: tripSnapshot.data().starts_at.toDate(),
        endsAt: tripSnapshot.data().ends_at.toDate(),
        ownerName: tripSnapshot.data().owner_name,
        ownerEmail: tripSnapshot.data().owner_email,
        isConfirmed: tripSnapshot.data().confirmed,
        guests: []
      })

      const guestsDocs = await getDocs(collection(fireStore, 'trips', tripId, 'guests'))
      trip.guests = guestsDocs.docs.map((guest) => {
        return {
          email: guest.data().email,
          name: guest.data().name,
          is_confirmed: guest.data().is_confirmed
        }
      })

      return trip
    } else {
      return undefined
    }
  }
}