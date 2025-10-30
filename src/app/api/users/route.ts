import { NextRequest, NextResponse } from 'next/server';
import { getUsers, createUser } from '@/lib/mockData';

export async function GET() {
  const users = getUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = createUser(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
