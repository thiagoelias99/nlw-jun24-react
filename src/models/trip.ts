import z from 'zod'
import { doc, getDoc, collection, getDocs, addDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { fireStore } from '@/services/firebase'
import { tr } from 'date-fns/locale'

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

export const createLinkDtoSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  tripId: z.string().min(1),
})

export type ICreateLinkDto = z.infer<typeof createLinkDtoSchema>

export const updateLinkDtoSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  tripId: z.string().min(1),
  linkId: z.string().min(1),
})

export type IUpdateLinkDto = z.infer<typeof updateLinkDtoSchema>

export interface ITripGuests {
  email: string
  name: string
  is_confirmed: boolean
}

export interface ITripLinks {
  id: string
  title: string
  url: string
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
  links: ITripLinks[]
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
  links: ITripLinks[]

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
        guests: [],
        links: []
      })

      const guestsDocs = await getDocs(collection(fireStore, 'trips', tripId, 'guests'))
      trip.guests = guestsDocs.docs.map((guest) => {
        return {
          email: guest.data().email,
          name: guest.data().name,
          is_confirmed: guest.data().is_confirmed
        }
      })

      const linksDocs = await getDocs(collection(fireStore, 'trips', tripId, 'links'))
      trip.links = linksDocs.docs.map((link) => {
        return {
          id: link.id,
          title: link.data().title,
          url: link.data().url
        }
      })

      return trip
    } else {
      return undefined
    }
  }

  static async createLink(data: ICreateLinkDto) {
    return addDoc(collection(fireStore, 'trips', data.tripId, 'links'), {
      title: data.title,
      url: data.url
    })
  }

  static async updateLink(data: IUpdateLinkDto) {
    const document = doc(fireStore, 'trips', data.tripId, 'links', data.linkId)

    return setDoc(document, {
      title: data.title,
      url: data.url
    })
  }

  static async deleteLink(data: IUpdateLinkDto) {
    const document = doc(fireStore, 'trips', data.tripId, 'links', data.linkId)

    return deleteDoc(document)
  }
}