import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '../content';

export const dynamic = 'force-static';
export const alt = site.photoAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  // satori does not decode WebP (it silently draws nothing), so the card uses a JPEG copy of public/photo.webp.
  const photo = await readFile(join(process.cwd(), 'src', 'assets', 'photo-og.jpg'));
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 72px',
          background: 'linear-gradient(160deg, #B4D2E2 0%, #DCE8E0 55%, #F1EFE2 100%)',
          color: '#17231D',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 400,
            height: 480,
            borderRadius: 32,
            overflow: 'hidden',
            border: '8px solid rgba(255,255,255,0.85)',
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={400} height={480} style={{ objectFit: 'cover' }} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 64 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28, fontSize: 36, lineHeight: 1.25 }}>
            <span>{site.headline[0]}</span>
            <span>{site.headline[1]}</span>
          </div>
          <div style={{ marginTop: 36, fontSize: 28, color: '#1F6349', fontWeight: 600 }}>{site.eyebrow[0]}</div>
        </div>
      </div>
    ),
    size,
  );
}
