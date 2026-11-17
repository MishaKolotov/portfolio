import { describe, it, expect } from 'vitest';
import * as content from '../src/content';
import {
  site, facts, experience, projects, moreProjects, stack, workedWith, contacts, contact,
} from '../src/content';
import type { Role } from '../src/content.types';
import { findBanned } from './helpers/banned';

const allRoles = (): Role[] =>
  experience.flatMap((j) => ('roles' in j ? j.roles : [j]));
const strings = (v: unknown): string[] =>
  typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(strings)
  : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
const links = (v: unknown): { href: string; external?: boolean }[] =>
  Array.isArray(v) ? v.flatMap(links)
  : v && typeof v === 'object'
    ? ('href' in v && typeof (v as { href: unknown }).href === 'string'
        ? [v as { href: string; external?: boolean }] : []).concat(Object.values(v).flatMap(links))
    : [];
const oreamnos = () => allRoles().find((r) => typeof r.org !== 'string' && r.org.label === 'Oreamnos')!;
const openai = () => allRoles().find((r) => typeof r.org !== 'string' && r.org.label === 'OpenAI AI Lab')!;

describe('content rules', () => {
  it('headline', () => {
    expect(site.headline).toEqual(['I build AI products.', 'And I test the models behind them.']);
  });
  it('fact labels', () => {
    expect(facts.map((f) => f.label)).toEqual(['OpenAI AI Lab', '5 LLM providers', 'My own LLM bot', '10 years']);
  });
  it('no banned words anywhere', () => {
    expect(findBanned(JSON.stringify(content))).toBe(false);
  });
  it('no Bedrock/Vertex chips in stack', () => {
    const chips = stack.flatMap((g) => [...g.core, ...(g.more ?? [])]);
    expect(chips.some((c) => /Bedrock|Vertex/.test(c))).toBe(false);
  });
  it('Backend has no Python chip', () => {
    const g = stack.find((s) => s.name === 'Backend')!;
    expect([...g.core, ...(g.more ?? [])].some((c) => /Python/.test(c))).toBe(false);
  });
  it('OpenAI role is past tense with exact dates', () => {
    const r = openai();
    expect(r.dates).toBe('Aug → Oct 2026 · alongside Oreamnos');
    expect(r.context).toBe('I wrote hard software research tasks, ran the model on them and graded its answers against a rubric.');
  });
  it('Oreamnos never says "in production"; e-invoice is merged to staging', () => {
    const r = oreamnos();
    const all = strings([r.context, r.bullets, r.more, r.chips, r.title, r.dates]);
    expect(all.some((s) => /in production/i.test(s))).toBe(false);
    expect(all.some((s) => /E-invoice/.test(s) && s.includes('merged to staging'))).toBe(true);
  });
  it('hrefs: external are https, others #, / or mailto:', () => {
    const ls = links(content);
    expect(ls.length).toBeGreaterThan(20);
    for (const l of ls) {
      if (l.external) expect(l.href).toMatch(/^https:\/\//);
      else expect(l.href).toMatch(/^(#|\/|mailto:)/);
    }
    expect(contacts.length).toBe(4);
    expect(workedWith.length).toBe(6);
    expect(contact.links.length).toBe(4);
  });
  it('counts', () => {
    expect(moreProjects.length).toBe(8);
    expect(projects.length).toBe(5);
    expect(stack.length).toBe(8);
  });
});
