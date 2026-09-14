import { describe, expect, it } from 'vitest';
import { DemoEmailProvider } from '../src/providers/demo.js';
import { EmailWaterfall } from '../src/workflows/emailWaterfall.js';

const lead = { id: '1', company: 'Acme', domain: 'acme.test', firstName: 'Ava', source: 'test', status: 'new' as const };

describe('EmailWaterfall', () => {
  it('uses cheapest provider that returns a hit', async () => {
    const wf = new EmailWaterfall([
      new DemoEmailProvider('expensive', 3, true),
      new DemoEmailProvider('cheap-miss', 1, false),
      new DemoEmailProvider('mid-hit', 2, true)
    ]);
    const result = await wf.resolve(lead);
    expect(result?.provider).toBe('mid-hit');
  });

  it('caches a hit', async () => {
    const wf = new EmailWaterfall([new DemoEmailProvider('hit', 1, true)]);
    await wf.resolve(lead);
    await wf.resolve(lead);
    expect(wf.cachedCount).toBe(1);
  });
});
