import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.formData()

    return NextResponse.json(
      { status: true, message: 'Registration successful \n Contact ICT Admin' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { status: false, errorMessage: error.message },
      { status: 500 }
    )
  }
}
