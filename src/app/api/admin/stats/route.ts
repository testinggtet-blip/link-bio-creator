import { NextResponse } from 'next/server';
import { getAdminStats } from '@/lib/mockData';

export async function GET() {
  try {
    const stats = getAdminStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
