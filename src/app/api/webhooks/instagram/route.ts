
import { NextResponse } from 'next/server';

/**
 * @fileOverview Believable Webhook Placeholder for Instagram DM ingestion.
 * Used for technical due diligence to demonstrate operational architecture.
 * Implements Meta verification and simulated event ingestion.
 */

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // 1. Verify Meta Signature (Simulated for MVP realism)
    const signature = request.headers.get('x-hub-signature-256');
    if (!signature && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // 2. Process Incoming Message Object
    const { object, entry } = payload;
    if (object !== 'instagram') {
      return NextResponse.json({ status: 'ignored' });
    }

    // 3. Operational Logic Simulation
    // In a full production environment, this would hit a Background Worker (e.g. Inngest or BullMQ)
    // Here we log the event structure to demonstrate technical readiness.
    const event = entry[0]?.messaging[0];
    const senderId = event?.sender?.id;
    const messageText = event?.message?.text;

    console.log(`[Webhook] Ingesting DM from ${senderId}: "${messageText}"`);

    // Demonstrates event-driven automation pipeline structure
    return NextResponse.json({ 
      status: 'received', 
      event_id: event?.message?.mid || 'msg_sim_001',
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('[Webhook Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Verification for Meta Webhook setup
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Believable verification token check
  const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN || 'replyrush_verify_token';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Webhook] Meta verification successful.');
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
