import { CAL_URL, EMAIL, contact, labels, sections } from '../content';
import { ExternalLink } from './ExternalLink';

export function Contact() {
  return (
    <section id="contact">
      <div className="label">
        <h2>{sections.contact.heading}</h2>
      </div>
      <div className="card contact" id="book">
        <h3 className="ch">{contact.heading}</h3>
        <p className="muted">{contact.text}</p>
        <div className="cta" style={{ margin: 0 }}>
          <ExternalLink className="btn primary" link={{ label: labels.book, href: CAL_URL, external: true }} />
        </div>
        <a className="mail u" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <div className="links">
          {contact.links.map((l) => (
            <ExternalLink className="u" link={l} key={l.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
