import {
  CAL_URL, contacts, earlier, experience, howIWork, moreProjects, outside, projects, sections, site, stack,
} from '../content';
import type { Role } from '../content';

const plain = (s: string): string => s.replace(/\*\*/g, '');
const orgName = (o: Role['org']): string => (typeof o === 'string' ? o : o.label);

function role(r: Role, h = '###'): string[] {
  const org = orgName(r.org) + (r.orgAlso ? ` (${r.orgAlso.label})` : '');
  return [
    `${h} ${org} · ${r.title}`,
    r.dates,
    '',
    r.context,
    ...r.bullets.map((b) => `- ${plain(b)}`),
    ...(r.more ?? []).map((b) => `- ${plain(b)}`),
    `Stack: ${r.chips.join(', ')}`,
    '',
  ];
}

export function buildLlmsTxt(): string {
  const out: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.eyebrow[0]} (${site.eyebrow[1]})`,
    '',
    site.headline.join(' '),
    '',
    site.lead.join(' '),
    '',
    site.status,
    site.terms,
    '',
    '## Contact',
    '',
    `- Book a call: ${CAL_URL}`,
    ...contacts.map((c) => (c.href.startsWith('mailto:') ? `- Email: ${c.label}` : `- ${c.label}: ${c.href}`)),
    '',
    `## ${sections.experience.heading}`,
    '',
  ];
  for (const job of experience) {
    if ('roles' in job) {
      out.push(`### ${job.heading}`, job.dates, '');
      for (const r of job.roles) out.push(...role(r, '####'));
    } else out.push(...role(job));
  }
  out.push(`### ${earlier.summary}`, earlier.context, `Stack: ${earlier.chips.join(', ')}`, '');
  out.push(`## ${sections.projects.heading}`, '', sections.projects.sub ?? '', '');
  for (const p of projects) {
    out.push(`### ${p.name.label} · ${p.status}`, p.summary);
    for (const s of p.stats ?? []) out.push(`- ${s.label}: ${s.text}`);
    if (p.story) out.push(`- ${plain(p.story.lead)} ${p.story.text}`);
    for (const b of [...(p.bullets ?? []), ...(p.more ?? [])]) out.push(`- ${plain(b)}`);
    out.push(`Stack: ${p.chips.join(', ')}`);
    for (const l of p.links ?? []) out.push(`${l.label}: ${l.href}`);
    out.push('');
  }
  out.push(`### ${sections.projects.moreHeading}`, '');
  for (const m of moreProjects) {
    out.push(`- ${typeof m.name === 'string' ? m.name : m.name.label} (${m.status}): ${m.text}`);
  }
  out.push('', `## ${sections.stack.heading}`, '');
  for (const g of stack) {
    out.push(`- ${g.name}: ${[...g.core, ...(g.more ?? [])].join(', ')}`);
    if (g.note) out.push(`  ${g.note}`);
  }
  out.push('', `## ${sections.howIWork.heading}`, '', howIWork.intro, '');
  for (const r of howIWork.rules) out.push(`- ${r.title}: ${r.text}`);
  out.push('', `## ${sections.outside.heading}`, '', outside.text.replace('{studio}', outside.studio.label), outside.line, '');
  return out.join('\n');
}
