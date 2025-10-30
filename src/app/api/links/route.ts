import { NextRequest, NextResponse } from 'next/server';
import { createLink, getLinksByUserId } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }
  
  const links = getLinksByUserId(parseInt(userId));
  return NextResponse.json(links);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newLink = createLink(body);
    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create link' },
      { status: 500 }
    );
  }
}
