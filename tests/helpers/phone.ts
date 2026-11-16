/** True when the text contains a phone-shaped run (9+ digits, optional separators) or a tel: link. Years are ignored. */
export function hasPhoneShape(text: string): boolean {
  const t = text.replace(/(?<!\d)(?:19|20)\d{2}(?!\d)/g, ' ');
  return /tel:/i.test(t) || /\+?\d(?:[\s().-]?\d){8,}/.test(t);
}
