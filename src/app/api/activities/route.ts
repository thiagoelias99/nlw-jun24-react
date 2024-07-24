import { createActivityDtoSchema, Trip, updateActivityDtoSchema } from '@/models/trip'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = createActivityDtoSchema.parse(body)

    await Trip.createActivity(parsedBody)

    return Response.json({ status: 201 })
  } catch (error) {
    console.error('Error adding activity: ', error)
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      return Response.json({ error: 'Error adding activity' }, { status: 500 })
    }
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = updateActivityDtoSchema.parse(body)

    await Trip.updateActivity(parsedBody)

    return Response.json({ status: 200 })
  } catch (error) {
    console.error('Error adding activity: ', error)
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      return Response.json({ error: 'Error adding activity' }, { status: 500 })
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = updateActivityDtoSchema.parse(body)

    await Trip.deleteActivity(parsedBody)

    return Response.json({ status: 200 })
  } catch (error) {
    console.error('Error adding activity: ', error)
    if (error instanceof ZodError) {
      return Response.json({ error: error.flatten().fieldErrors }, { status: 400 })
    } else {
      return Response.json({ error: 'Error adding activity' }, { status: 500 })
    }
  }
}