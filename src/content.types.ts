// Inline emphasis: a run wrapped in **double asterisks** inside any bullet/story string is bold (<b> in the mock).
export type Link = { label: string; href: string; external?: boolean };
export type Fact = { label: string; text: string };
export type Role = {
  id?: string;
  org: Link | string;
  /** Second organisation link shown in brackets after `org` (Kaseya (Pulseway)). */
  orgAlso?: Link;
  title: string;
  dates: string;
  context: string;
  bullets: string[];
  more?: string[];
  /** Visually hidden label after "More", without the leading space (e.g. `about Lumigo`). */
  moreLabel?: string;
  chips: string[];
};
export type Job = Role | { id: string; heading: string; dates: string; roles: Role[] }; // Digis card
export type Project = {
  name: Link;
  status: string;
  summary: string;
  stats?: Fact[]; // label = big number, text = caption
  story?: { lead: string; text: string }; // lead is bold; text has no leading space
  bullets?: string[];
  more?: string[];
  moreLabel?: string;
  chips: string[];
  links?: Link[]; // label has no trailing arrow; the renderer adds "↗"
};
export type MoreProject = { name: Link | string; text: string; status: string };
export type SkillGroup = {
  name: string;
  core: string[];
  more?: string[];
  /** Hidden label after "<n> more", without the leading space (e.g. `AI and LLM skills`). */
  moreLabel?: string;
  note?: string;
};
export type Section = { heading: string; sub?: string };
