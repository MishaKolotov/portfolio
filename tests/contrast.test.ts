import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrast, over, type RGB, type RGBA } from '../src/lib/contrast';

const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const root = /:root\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';

function token(name: string): string {
  const m = new RegExp(`--${name}\\s*:\\s*([^;]+);`).exec(root);
  if (!m) throw new Error(`token --${name} not found in :root of globals.css`);
  return m[1].trim();
}

function parse(value: string): RGBA {
  const hex = /^#([0-9a-f]{6})$/i.exec(value);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const rgba = /^rgba?\(([^)]+)\)$/.exec(value);
  if (!rgba) throw new Error(`cannot parse colour: ${value}`);
  const p = rgba[1].split(',').map((s) => parseFloat(s));
  return [p[0], p[1], p[2], p[3] ?? 1];
}

const rgb = (c: RGB | RGBA): RGB => [c[0], c[1], c[2]];

const stops: RGB[] = [
  [0xb4, 0xd2, 0xe2],
  [0xdc, 0xe8, 0xe0],
  [0xf1, 0xef, 0xe2],
];
const glassOf = (stop: RGB): RGB => over(parse(token('glass')), stop);

const ink = parse(token('ink'));
const ink2 = parse(token('ink2'));
const ink3 = parse(token('ink3'));
const white: RGB = [255, 255, 255];

describe('tokens match the approved values', () => {
  it('ink2 is ink at 0.8, ink3 is ink at 0.55, glass is white at 0.62', () => {
    expect(rgb(ink2)).toEqual(rgb(ink));
    expect(ink2[3]).toBe(0.8);
    expect(rgb(ink3)).toEqual(rgb(ink));
    expect(ink3[3]).toBe(0.55);
    expect(parse(token('glass'))).toEqual([255, 255, 255, 0.62]);
  });
});

describe('WCAG contrast helpers', () => {
  it('black on white is 21, same colour is 1', () => {
    expect(contrast([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5);
    expect(contrast([10, 20, 30], [10, 20, 30])).toBeCloseTo(1, 5);
  });
  it('over blends by alpha', () => {
    expect(over([255, 255, 255, 0.5], [0, 0, 0])).toEqual([127.5, 127.5, 127.5]);
  });
});

describe('text contrast on the sky', () => {
  stops.forEach((stop, i) => {
    it(`ink and ink2 >= 4.5 on sky stop ${i}`, () => {
      expect(contrast(rgb(ink), stop)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(rgb(over(ink2, stop)), stop)).toBeGreaterThanOrEqual(4.5);
    });
    it(`ink and ink2 >= 4.5 on glass over sky stop ${i}`, () => {
      const g = glassOf(stop);
      expect(contrast(rgb(over(ink, g)), g)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(rgb(over(ink2, g)), g)).toBeGreaterThanOrEqual(4.5);
    });
    it(`ink3 >= 3 on sky stop ${i}`, () => {
      expect(contrast(rgb(over(ink3, stop)), stop)).toBeGreaterThanOrEqual(3);
    });
  });
});

describe('accents', () => {
  it('white on both button gradient ends >= 4.5', () => {
    expect(contrast(white, rgb(parse(token('accent1'))))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(white, rgb(parse(token('accent2'))))).toBeGreaterThanOrEqual(4.5);
  });
  it('focus colour on the lightest-contrast stop: note text >= 4.5, ring >= 3', () => {
    const focus = rgb(parse(token('focus')));
    expect(contrast(focus, stops[0])).toBeGreaterThanOrEqual(4.5);
    expect(contrast(focus, stops[0])).toBeGreaterThanOrEqual(3);
  });
  it('token values are the approved ones', () => {
    expect(token('accent1').toUpperCase()).toBe('#2B7F5E');
    expect(token('accent2').toUpperCase()).toBe('#1F6349');
    expect(token('focus').toUpperCase()).toBe('#174C38');
  });
});
