import { NextRequest } from 'next/server'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { fireStore } from '@/services/firebase'
import { Trip } from '@/models/trip'
import nodemailer from 'nodemailer'
import { getMailClient } from '@/services/mail'

export async function GET(req: NextRequest) {
  const pathName = req.nextUrl.pathname
  const tripId = pathName.split('/')[3]

  const tripDoc = doc(fireStore, 'trips', tripId)
  const tripSnapshot = await getDoc(tripDoc)

  if (tripSnapshot.exists()) {
    await setDoc(tripDoc, { confirmed: true }, { merge: true })
    const trip = await Trip.fromFirestore(tripId)

    const mail = await getMailClient()
    for (const guest of trip.guests) {
      const message = await mail.sendMail({
        from: {
          name: 'Equipe planner',
          address: 'planner@email.com'
        },
        to: {
          name: guest.email,
          address: guest.email
        },
        subject: 'Confirmação de presença',
        html: `
          <h1>Você foi convidado para a Trip ${trip.destination}</h1>
          <p>Olá, você foi convidado para a trip ${trip.destination}!</p>
          <p>Confira os detalhes:</p>
          <ul>
            <li>Destino: ${trip.destination}</li>
            <li>Início: ${trip.startsAt}</li>
            <li>Fim: ${trip.endsAt}</li>
          </ul>
          <p>Para confirmar sua presença, clique no link abaixo:</p>
          <a href="http://localhost:3000/api/trips/${tripId}/confirm/${guest.email}">Confirmar trip</a>
          `
      })

      const testURL = nodemailer.getTestMessageUrl(message)

      console.log('Preview URL: %s', testURL)
    }

    return Response.redirect(`http://localhost:3000/trips/${tripId}`)
  }

  return Response.redirect('http://localhost:3000')
}