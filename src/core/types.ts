export type LeadStatus = 'new' | 'researched' | 'enriched' | 'approved' | 'sent' | 'replied' | 'booked';

export interface Lead {
  id: string;
  company: string;
  domain: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  source: string;
  status: LeadStatus;
  research?: ResearchResult;
  qualification?: Qualification;
}

export interface ResearchResult { summary: string; signals: string[]; evidence: string[]; }
export interface Qualification { score: number; reasons: string[]; qualified: boolean; }
export interface EmailCandidate { email: string; provider: string; confidence: number; }
export interface OutboundMessage { subject: string; body: string; }
export interface ReplyDraft {
  label: 'positive' | 'question' | 'objection' | 'not_interested' | 'ooo' | 'other';
  draft: string;
  shouldEscalate: boolean;
}
