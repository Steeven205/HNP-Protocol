/**
 * GET /api/negotiate/[id]/events
 *
 * Server-Sent Events stream for a live negotiation.
 * The client connects and receives events as they happen.
 */

import { store } from "@/lib/negotiation-store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = store.get(id);

  if (!session) {
    return new Response(JSON.stringify({ error: "Session not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send current state first (replay)
      const initData = JSON.stringify({
        type: "init",
        session: {
          id: session.id,
          status: session.status,
          traveler: session.traveler,
          destination: session.destination,
          check_in: session.check_in,
          check_out: session.check_out,
          nights: session.nights,
          budget: session.budget,
          initial_rate: session.initial_rate,
          current_rate: session.current_rate,
          final_rate: session.final_rate,
          savings_pct: session.savings_pct,
          rounds: session.rounds,
          duration_s: session.duration_s,
          booking_ref: session.booking_ref,
          messages: session.messages,
        },
      });
      controller.enqueue(encoder.encode(`data: ${initData}\n\n`));

      // If already completed, close immediately
      if (session.completed_at) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
        controller.close();
        return;
      }

      // Subscribe to live events
      const unsubscribe = store.subscribe(id, (event, data) => {
        try {
          const payload = JSON.stringify({ type: event, data });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));

          // Close stream when negotiation completes
          if (event === "update") {
            const patch = data as Record<string, unknown>;
            if (patch.completed_at) {
              setTimeout(() => {
                try {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
                  controller.close();
                } catch {
                  // stream already closed
                }
              }, 500);
            }
          }
        } catch {
          // stream closed by client
          unsubscribe();
        }
      });

      // Cleanup on cancel
      _request.signal.addEventListener("abort", () => {
        unsubscribe();
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
