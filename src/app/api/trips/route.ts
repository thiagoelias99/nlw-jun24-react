import { createTripDtoSchema, ICreateTripDto } from '@/models/trip'
import { fireStore } from '@/services/firebase'
import { getMailClient } from '@/services/mail'
import { collection, addDoc } from 'firebase/firestore'
import nodemailer from 'nodemailer'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  const body = await req.json()
  try {
    const docRef = await addDoc(collection(fireStore, 'trips'), {
      body
    })

    const parsedBody = createTripDtoSchema.parse(body)

    console.log('Parsed body: ', parsedBody)

    console.log('Document written with ID: ', docRef.id)

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
        <h1>Viagem criada com sucesso</h1>
        <p>Olá, uma nova viagem foi criada com sucesso!</p>
        <p>Confira os detalhes:</p>
        <pre>${JSON.stringify(body, null, 2)}</pre>
      `
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))

    return Response.json(body)

  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      console.error('Error adding document: ', error)
      return Response.json({ error: 'Error adding document' }, { status: 500 })
    }
  }
} 