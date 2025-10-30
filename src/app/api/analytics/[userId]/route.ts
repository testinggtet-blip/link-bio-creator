import { NextRequest, NextResponse } from 'next/server';
import { getAnalytics } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const analytics = getAnalytics(parseInt(userId));
    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
