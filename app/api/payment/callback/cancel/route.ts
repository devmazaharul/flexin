import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0] || 'unknown';
  return NextResponse.json({ ip });
};
