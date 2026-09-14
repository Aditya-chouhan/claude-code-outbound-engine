import type { EmailCandidate, Lead, OutboundMessage, ReplyDraft, ResearchResult } from '../core/types.js';

export interface SourceProvider { name: string; list(query: string): Promise<Lead[]>; }
export interface ResearchProvider { name: string; research(lead: Lead): Promise<ResearchResult>; }
export interface EmailProvider { name: string; costRank: number; find(lead: Lead): Promise<EmailCandidate | null>; }
export interface SenderProvider { name: string; send(lead: Lead, message: OutboundMessage): Promise<{ messageId: string }>; }
export interface ReplyIntelligenceProvider { name: string; draft(thread: string, lead: Lead): Promise<ReplyDraft>; }
