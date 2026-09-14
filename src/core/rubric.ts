import type { Qualification, ResearchResult } from './types.js';

export interface QualificationRubric {
  minScore: number;
  score(result: ResearchResult): Qualification;
}

export const defaultRubric: QualificationRubric = {
  minScore: 60,
  score(result) {
    let score = 20;
    const reasons: string[] = [];

    if (result.signals.length >= 1) { score += 25; reasons.push('At least one concrete buying signal'); }
    if (result.signals.length >= 2) { score += 20; reasons.push('Multiple corroborating signals'); }
    if (result.evidence.length >= 2) { score += 20; reasons.push('Evidence is independently traceable'); }
    if (result.summary.length >= 80) { score += 15; reasons.push('Research context is sufficiently detailed'); }

    score = Math.min(100, score);
    return { score, reasons, qualified: score >= this.minScore };
  }
};
