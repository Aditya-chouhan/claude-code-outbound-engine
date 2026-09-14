import { describe, expect, it } from 'vitest';
import { defaultRubric } from '../src/core/rubric.js';

describe('qualification rubric', () => {
  it('qualifies evidence-backed multi-signal research', () => {
    const q = defaultRubric.score({
      summary: 'A'.repeat(100),
      signals: ['Hiring', 'Expansion'],
      evidence: ['source1', 'source2']
    });
    expect(q.qualified).toBe(true);
    expect(q.score).toBe(100);
  });
});
