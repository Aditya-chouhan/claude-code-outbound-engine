import type { Lead, OutboundMessage } from '../core/types.js';
import type { ResearchProvider, SenderProvider, SourceProvider } from '../providers/contracts.js';
import { defaultRubric, type QualificationRubric } from '../core/rubric.js';
import { EmailWaterfall } from './emailWaterfall.js';

export class OutboundOrchestrator {
  constructor(
    private readonly source: SourceProvider,
    private readonly research: ResearchProvider,
    private readonly emails: EmailWaterfall,
    private readonly sender: SenderProvider,
    private readonly rubric: QualificationRubric = defaultRubric
  ) {}

  async run(query: string): Promise<Lead[]> {
    const leads = await this.source.list(query);
    const completed: Lead[] = [];

    for (const lead of leads) {
      lead.research = await this.research.research(lead);
      lead.qualification = this.rubric.score(lead.research);
      lead.status = 'researched';

      if (!lead.qualification.qualified) {
        completed.push(lead);
        continue;
      }

      const email = await this.emails.resolve(lead);
      if (!email) {
        completed.push(lead);
        continue;
      }

      lead.email = email.email;
      lead.status = 'enriched';

      const message: OutboundMessage = {
        subject: `Quick idea for ${lead.company}`,
        body: `Hi ${lead.firstName ?? 'there'},\n\nI noticed ${lead.research.signals[0]}. I mapped a small outbound workflow that may be relevant to ${lead.company}.\n\nWorth a look?`
      };

      await this.sender.send(lead, message);
      lead.status = 'sent';
      completed.push(lead);
    }

    return completed;
  }
}
