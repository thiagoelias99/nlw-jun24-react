import { createLinkDtoSchema, Trip, updateLinkDtoSchema } from '@/models/trip'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = createLinkDtoSchema.parse(body)

    await Trip.createLink(parsedBody)

    return Response.json({ status: 201 })
  } catch (error) {
    console.error('Error adding link: ', error)
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      return Response.json({ error: 'Error adding link' }, { status: 500 })
    }
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = updateLinkDtoSchema.parse(body)

    await Trip.updateLink(parsedBody)

    return Response.json({ status: 200 })
  } catch (error) {
    console.error('Error adding link: ', error)
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      return Response.json({ error: 'Error adding link' }, { status: 500 })
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = updateLinkDtoSchema.parse(body)

    await Trip.deleteLink(parsedBody)

    return Response.json({ status: 200 })
  } catch (error) {
    console.error('Error adding link: ', error)
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      return Response.json({ error: 'Error adding link' }, { status: 500 })
    }
  }
}