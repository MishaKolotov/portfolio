import Image from 'next/image';
import { CAL_URL, contacts, contact, facts, labels, nav, site, workedWith } from '../content';
import { ExternalLink } from './ExternalLink';

export function Hero() {
  return (
    <header>
      <div className="open">
        <i></i>
        {site.status}
      </div>
      <div className="eyebrow">
        {site.eyebrow[0]} <span>{site.eyebrow[1]}</span>
      </div>
      <h1>
        {site.headline[0]} <span>{site.headline[1]}</span>
      </h1>
      <p className="lead">
        {site.lead[0]}
        <br /> {site.lead[1]}
      </p>
      <p className="terms">{site.terms}</p>
      <div className="cta">
        <ExternalLink className="btn primary" link={{ label: labels.book, href: CAL_URL, external: true }} />
        <a className="btn glass" href={contact.cv.href}>
          {contact.cv.label}
        </a>
      </div>
      <div className="reach">
        {contacts.map((c) => (
          <ExternalLink className="u" link={c} key={c.href} />
        ))}
      </div>

      <div className="jump">
        {nav.map((l) => (
          <a className="u" href={l.href} key={l.href}>
            {l.label}
          </a>
        ))}
      </div>

      <div className="stage">
        <div className="note" aria-hidden="true">
          {site.note}
          <svg viewBox="0 0 56 44" width="56" height="44">
            <path
              d="M4 4 C 30 2, 46 14, 44 38 M36 30 L44 39 L51 29"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="panel">
          <div className="ph">
            <Image src="/photo.webp" alt={site.photoAlt} width={1280} height={960} priority sizes="(max-width: 760px) 100vw, 340px" />
          </div>
          <div className="facts">
            {facts.map((f) => (
              <div className="fact" key={f.label}>
                <div className="k">{f.label}</div>
                <div className="v">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="logos">
        <small>{labels.workedWith}</small>
        {workedWith.map((l) => (
          <a className="u" href={l.href} key={l.label}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
