import { CAL_URL, labels, nav, site } from '../content';
import { ExternalLink } from './ExternalLink';

export function Nav() {
  return (
    <div className="navwrap">
      <nav aria-label="Sections">
        <a className="name" href="#main">
          {site.name}
        </a>
        {nav.map((l) => (
          <a className="l" href={l.href} key={l.href}>
            {l.label}
          </a>
        ))}
        <ExternalLink className="btn primary sm" link={{ label: labels.bookShort, href: CAL_URL, external: true }} />
      </nav>
    </div>
  );
}
