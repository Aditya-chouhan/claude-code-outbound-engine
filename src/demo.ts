import { DemoEmailProvider, DemoResearch, DemoSender, DemoSource } from './providers/demo.js';
import { EmailWaterfall } from './workflows/emailWaterfall.js';
import { OutboundOrchestrator } from './workflows/orchestrator.js';

const waterfall = new EmailWaterfall([
  new DemoEmailProvider('Million Verifier', 1, false),
  new DemoEmailProvider('Findymail', 2, true),
  new DemoEmailProvider('FullEnrich', 3, true),
  new DemoEmailProvider('LeadMagic', 4, true)
]);

const engine = new OutboundOrchestrator(
  new DemoSource(),
  new DemoResearch(),
  waterfall,
  new DemoSender()
);

const result = await engine.run('B2B SaaS revenue teams');
console.table(result.map(l => ({
  company: l.company,
  score: l.qualification?.score,
  qualified: l.qualification?.qualified,
  email: l.email ?? '-',
  status: l.status
})));
console.log(`Cached email hits: ${waterfall.cachedCount}`);
