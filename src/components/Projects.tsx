import { moreProjects, projects, sections } from '../content';
import { ExternalLink } from './ExternalLink';
import { More } from './More';
import { Chips, Points, Rich } from './parts';

export function Projects() {
  return (
    <section id="projects">
      <div className="label">
        <h2>{sections.projects.heading}</h2>
        <small>{sections.projects.sub}</small>
      </div>
      <div className="body">
        {projects.map((p) => (
          <article className="card proj" key={p.name.label}>
            <header>
              <h3 className="pt">
                <ExternalLink className="x" link={p.name} />
              </h3>
              <span className="status">{p.status}</span>
            </header>
            <p>{p.summary}</p>
            {p.stats ? (
              <div className="nums">
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <div className="big">{s.label}</div>
                    <div className="cap">{s.text}</div>
                  </div>
                ))}
              </div>
            ) : null}
            {p.story ? (
              <p className="story">
                <b>{p.story.lead}</b> {p.story.text}
              </p>
            ) : null}
            {p.bullets ? <Points items={p.bullets} /> : null}
            {p.more ? (
              <More label="More" hidden={p.moreLabel}>
                <Points items={p.more} />
              </More>
            ) : null}
            <Chips items={p.chips} />
            {p.links ? (
              <div className="links">
                {p.links.map((l) => (
                  <ExternalLink className="u" link={l} arrow key={l.href} />
                ))}
              </div>
            ) : null}
          </article>
        ))}

        <h3 className="pt" style={{ marginTop: 12 }}>
          {sections.projects.moreHeading}
        </h3>
        <div className="card frame">
          {moreProjects.map((m) => (
            <div className="row" key={typeof m.name === 'string' ? m.name : m.name.label}>
              <div className="t">
                <b>{typeof m.name === 'string' ? m.name : <ExternalLink className="x" link={m.name} />}</b>
                <i>{m.text}</i>
              </div>
              <div className="r">{m.status}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
