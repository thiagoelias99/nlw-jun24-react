import { NextRequest } from 'next/server'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { fireStore } from '@/services/firebase'

export async function GET(req: NextRequest) {
  const pathName = req.nextUrl.pathname
  const tripId = pathName.split('/')[3]
  const email = pathName.split('/')[5]

  const document = doc(fireStore, 'trips', tripId, 'guests', email)
  const snapShot = await getDoc(document)

  if (snapShot.exists()) {
    await setDoc(document, { is_confirmed: true }, { merge: true })

    return Response.redirect(`http://localhost:3000/trips/${tripId}`)
  }

  return Response.redirect('http://localhost:3000')
}