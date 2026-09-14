import { Cache } from '../core/cache.js';
import type { Lead, EmailCandidate } from '../core/types.js';
import type { EmailProvider } from '../providers/contracts.js';

export class EmailWaterfall {
  constructor(
    private readonly providers: EmailProvider[],
    private readonly cache = new Cache<EmailCandidate>()
  ) {}

  async resolve(lead: Lead): Promise<EmailCandidate | null> {
    const cached = this.cache.get(lead.id);
    if (cached) return cached;

    const ordered = [...this.providers].sort((a, b) => a.costRank - b.costRank);
    for (const provider of ordered) {
      const hit = await provider.find(lead);
      if (hit) {
        this.cache.set(lead.id, hit);
        return hit;
      }
    }
    return null;
  }

  get cachedCount(): number { return this.cache.size; }
}
