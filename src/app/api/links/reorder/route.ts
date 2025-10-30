import { NextRequest, NextResponse } from 'next/server';
import { updateLinkOrder } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, linkIds } = body;
    
    if (!userId || !linkIds || !Array.isArray(linkIds)) {
      return NextResponse.json(
        { error: 'userId and linkIds array are required' },
        { status: 400 }
      );
    }
    
    const updatedLinks = updateLinkOrder(userId, linkIds);
    return NextResponse.json(updatedLinks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reorder links' },
      { status: 500 }
    );
  }
}
