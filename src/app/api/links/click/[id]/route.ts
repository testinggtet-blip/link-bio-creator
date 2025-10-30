import { NextRequest, NextResponse } from 'next/server';
import { incrementClickCount } from '@/lib/mockData';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const link = incrementClickCount(parseInt(id));
    
    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    return NextResponse.json({ clickCount: link.clickCount });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
}
