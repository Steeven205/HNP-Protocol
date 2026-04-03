/**
 * In-memory store for live negotiation sessions.
 * POC only — will be replaced by Supabase in MVP.
 */

export interface LiveMessage {
  id: string;
  agent: "corporate" | "hotel" | "system";
  type: "TRAVEL_INTENT" | "HOTEL_OFFER" | "COUNTER_PROPOSAL" | "CONFIRMATION" | "SYSTEM";
  timestamp: string;
  content: string;
  data?: Record<string, unknown>;
}

export interface LiveSession {
  id: string;
  status: "connecting" | "in_progress" | "confirmed" | "escalated" | "error";
  traveler: string;
  destination: string;
  check_in: string;
  check_out: string;
  nights: number;
  budget: number;
  initial_rate: number | null;
  current_rate: number | null;
  final_rate: number | null;
  savings_pct: number | null;
  rounds: number;
  duration_s: number;
  messages: LiveMessage[];
  started_at: string;
  completed_at: string | null;
  booking_ref: string | null;
}

type Listener = (event: string, data: unknown) => void;

class NegotiationStore {
  private sessions = new Map<string, LiveSession>();
  private listeners = new Map<string, Set<Listener>>();

  create(id: string, params: {
    traveler: string;
    destination: string;
    check_in: string;
    check_out: string;
    budget: number;
  }): LiveSession {
    const nights = Math.ceil(
      (new Date(params.check_out).getTime() - new Date(params.check_in).getTime()) / 86400000,
    );
    const session: LiveSession = {
      id,
      status: "connecting",
      traveler: params.traveler,
      destination: params.destination,
      check_in: params.check_in,
      check_out: params.check_out,
      nights,
      budget: params.budget,
      initial_rate: null,
      current_rate: null,
      final_rate: null,
      savings_pct: null,
      rounds: 0,
      duration_s: 0,
      messages: [],
      started_at: new Date().toISOString(),
      completed_at: null,
      booking_ref: null,
    };
    this.sessions.set(id, session);
    return session;
  }

  get(id: string): LiveSession | undefined {
    return this.sessions.get(id);
  }

  addMessage(id: string, msg: LiveMessage): void {
    const session = this.sessions.get(id);
    if (!session) return;
    session.messages.push(msg);
    this.emit(id, "message", msg);
  }

  update(id: string, patch: Partial<LiveSession>): void {
    const session = this.sessions.get(id);
    if (!session) return;
    Object.assign(session, patch);
    this.emit(id, "update", patch);
  }

  subscribe(id: string, listener: Listener): () => void {
    if (!this.listeners.has(id)) {
      this.listeners.set(id, new Set());
    }
    this.listeners.get(id)!.add(listener);
    return () => {
      this.listeners.get(id)?.delete(listener);
    };
  }

  private emit(id: string, event: string, data: unknown): void {
    const listeners = this.listeners.get(id);
    if (!listeners) return;
    for (const listener of listeners) {
      listener(event, data);
    }
  }

  listActive(): LiveSession[] {
    return [...this.sessions.values()].sort(
      (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
    );
  }
}

// Persist across Next.js hot-reloads in dev mode
const globalForStore = globalThis as unknown as { __hnpStore?: NegotiationStore };
export const store = globalForStore.__hnpStore ?? (globalForStore.__hnpStore = new NegotiationStore());
