import { NextRequest, NextResponse } from 'next/server';
import { updateLink, deleteLink } from '@/lib/mockData';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedLink = updateLink(parseInt(id), body);
    
    if (!updatedLink) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedLink);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update link' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = deleteLink(parseInt(id));
  
  if (!success) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  }
  
  return NextResponse.json({ message: 'Link deleted successfully' });
}
