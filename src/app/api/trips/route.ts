import { fireStore } from '@/services/firebase'
import { collection, addDoc } from 'firebase/firestore'

export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)



  try {
    const docRef = await addDoc(collection(fireStore, 'trips'), {
      body
    })

    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }

  return Response.json(body)
} 