import {
  EventsApiError,
  clearAccessToken,
  getThrowableMessage,
  readAccessToken,
  requestEventsApi,
} from '../../helpers'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

type CheckOutVehicleBody = {
  eventId: string
  vehicleId: string
}

function parseCheckOutBody(body: unknown): CheckOutVehicleBody {
  if (!body || typeof body !== 'object') {
    throw new Error('Corpo da requisição inválido.')
  }

  const payload = body as Record<string, unknown>

  return {
    eventId: String(payload['eventId'] ?? ''),
    vehicleId: String(payload['vehicleId'] ?? ''),
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const accessToken = readAccessToken(cookieStore)

  if (!accessToken) {
    return NextResponse.json({ message: 'Não autenticado.' }, { status: 401 })
  }

  let body: CheckOutVehicleBody

  try {
    body = parseCheckOutBody(await request.json())
  } catch {
    return NextResponse.json({ message: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const eventId = body.eventId.trim()
  const vehicleId = body.vehicleId.trim()

  if (!eventId || !vehicleId) {
    return NextResponse.json(
      { message: 'ID do evento e do veículo são obrigatórios.' },
      { status: 400 },
    )
  }

  try {
    const payload = await requestEventsApi(
      `/${eventId}/vehicles/${vehicleId}/check-out`,
      accessToken,
      {
        method: 'POST',
      },
    )

    return NextResponse.json(payload, { status: 200 })
  } catch (error) {
    if (error instanceof EventsApiError) {
      if (error.clearCookie) {
        clearAccessToken(cookieStore)
      }

      return NextResponse.json({ message: error.message }, { status: error.status })
    }

    return NextResponse.json(
      { message: getThrowableMessage(error, 'Falha ao registrar saída do veículo.') },
      { status: 500 },
    )
  }
}
