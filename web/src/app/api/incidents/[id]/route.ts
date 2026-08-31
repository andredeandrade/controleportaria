import {
  IncidentsApiError,
  clearAccessToken,
  getThrowableMessage,
  readAccessToken,
  requestIncidentsApi,
} from '../helpers'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies()
  const accessToken = readAccessToken(cookieStore)

  if (!accessToken) {
    return NextResponse.json({ message: 'Nao autenticado.' }, { status: 401 })
  }

  try {
    await requestIncidentsApi(`/${id}`, accessToken, {
      method: 'DELETE',
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof IncidentsApiError) {
      if (error.clearCookie) {
        clearAccessToken(cookieStore)
      }

      return NextResponse.json({ message: error.message }, { status: error.status })
    }

    return NextResponse.json(
      { message: getThrowableMessage(error, 'Falha ao excluir ocorrencia.') },
      { status: 500 },
    )
  }
}
