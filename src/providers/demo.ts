import type { EmailProvider, ReplyIntelligenceProvider, ResearchProvider, SenderProvider, SourceProvider } from './contracts.js';

export class DemoSource implements SourceProvider {
  name = 'DemoSource';
  async list(query: string) {
    return [
      { id: 'lead_001', company: 'Northstar Labs', domain: 'northstar.example', firstName: 'Maya', lastName: 'Chen', title: 'VP Revenue', source: query, status: 'new' as const },
      { id: 'lead_002', company: 'Orbit Commerce', domain: 'orbit.example', firstName: 'Noah', lastName: 'Patel', title: 'Head of Growth', source: query, status: 'new' as const }
    ];
  }
}

export class DemoResearch implements ResearchProvider {
  name = 'DemoResearch';
  async research(lead: any) {
    return {
      summary: `${lead.company} is expanding its revenue motion and appears to be investing in automation, making it a plausible fit for an API-first outbound system.`,
      signals: ['Hiring for revenue operations', 'Recent product expansion'],
      evidence: [`https://${lead.domain}/careers`, `https://${lead.domain}/news`]
    };
  }
}

export class DemoEmailProvider implements EmailProvider {
  constructor(public name: string, public costRank: number, private hit: boolean) {}
  async find(lead: any) {
    if (!this.hit) return null;
    const first = (lead.firstName ?? 'hello').toLowerCase();
    return { email: `${first}@${lead.domain}`, provider: this.name, confidence: 0.96 };
  }
}

export class DemoSender implements SenderProvider {
  name = 'DemoSender';
  async send(lead: any) { return { messageId: `msg_${lead.id}_${Date.now()}` }; }
}

export class DemoReplyAI implements ReplyIntelligenceProvider {
  name = 'DemoReplyAI';
  async draft(thread: string) {
    const positive = /interested|sounds good|book|calendar/i.test(thread);
    return {
      label: positive ? 'positive' as const : 'other' as const,
      draft: positive ? 'Thanks — happy to continue. I can send over a booking link.' : 'Thanks for the context. I will follow up with a concise answer.',
      shouldEscalate: true
    };
  }
}
