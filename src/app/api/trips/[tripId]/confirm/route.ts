import { NextRequest } from 'next/server'
import { setDoc, doc } from 'firebase/firestore'
import { fireStore } from '@/services/firebase'

export async function GET(req: NextRequest) {
  const pathName = req.nextUrl.pathname
  const tripId = pathName.split('/')[3]

  const tripDoc = doc(fireStore, 'trips', tripId)
  await setDoc(tripDoc, { confirmed: true }, { merge: true })

  return Response.redirect(`http://localhost:3000/trips/${tripId}`)
}