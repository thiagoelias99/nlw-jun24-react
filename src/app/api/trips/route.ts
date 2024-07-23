import { createTripDtoSchema, ICreateTripDto } from '@/models/trip'
import { fireStore } from '@/services/firebase'
import { getMailClient } from '@/services/mail'
import { collection, addDoc } from 'firebase/firestore'
import nodemailer from 'nodemailer'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = createTripDtoSchema.parse(body)

    const docRef = await addDoc(collection(fireStore, 'trips'), {
      ...parsedBody,
      confirmed: false
    })

    const tripId = docRef.id

    const mail = await getMailClient()

    const message = await mail.sendMail({
      from: {
        name: 'Equipe planner',
        address: 'planner@email.com'
      },
      to: {
        name: body.owner_email,
        address: body.owner_email
      },
      subject: 'Nova viagem criada',
      html: `
        <h1>Viagem para ${parsedBody.destination} criada com sucesso</h1>
        <p>Olá, uma nova viagem foi criada com sucesso!</p>
        <p>Confira os detalhes:</p>
        <ul>
          <li>Destino: ${parsedBody.destination}</li>
          <li>Início: ${parsedBody.starts_at}</li>
          <li>Fim: ${parsedBody.ends_at}</li>
        </ul>
        <p>Para confirmar sua presença, clique no link abaixo:</p>
        <a href="http://localhost:3000/api/trips/${tripId}/confirm">Confirmar trip</a>
        `
    })

    const testURL = nodemailer.getTestMessageUrl(message)

    console.log('Preview URL: %s', testURL)

    return Response.json({ confirm_url: testURL }, { status: 201 })

  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      console.error('Error adding document: ', error)
      return Response.json({ error: 'Error adding document' }, { status: 500 })
    }
  }
} 