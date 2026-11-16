import { CAL_URL, EMAIL, earlier, experience, labels, sections } from '../content';
import type { Role } from '../content';
import { ExternalLink } from './ExternalLink';
import { More } from './More';
import { Chips, Points } from './parts';

function RoleHeading({ role }: { role: Role }) {
  return (
    <>
      {typeof role.org === 'string' ? role.org : <ExternalLink className="x" link={role.org} />}
      {role.orgAlso ? (
        <>
          {' ('}
          <ExternalLink className="x" link={role.orgAlso} />)
        </>
      ) : null}
      {' · '}
      {role.title}
    </>
  );
}

function RoleBody({ role }: { role: Role }) {
  return (
    <>
      <p className="ctx">{role.context}</p>
      <Points items={role.bullets} />
      {role.more ? (
        <More label={labels.more} hidden={role.moreLabel}>
          <Points items={role.more} />
        </More>
      ) : null}
      <Chips items={role.chips} />
    </>
  );
}

export function Experience() {
  return (
    <section id="experience">
      <div className="label">
        <h2>{sections.experience.heading}</h2>
        <small>{sections.experience.sub}</small>
      </div>
      <div className="body">
        {experience.map((job) =>
          'roles' in job ? (
            <article className="card job" id={job.id} key={job.id}>
              <header>
                <h3>{job.heading}</h3>
                <span>{job.dates}</span>
              </header>
              {job.roles.map((role, i) => (
                <div className="sub" key={i} style={i === 0 ? { borderTop: 0, paddingTop: 0 } : undefined}>
                  <header>
                    <h3>
                      <RoleHeading role={role} />
                    </h3>
                    <span>{role.dates}</span>
                  </header>
                  <RoleBody role={role} />
                </div>
              ))}
            </article>
          ) : (
            <article className="card job" id={job.id} key={job.id}>
              <header>
                <h3>
                  <RoleHeading role={job} />
                </h3>
                <span>{job.dates}</span>
              </header>
              <RoleBody role={job} />
            </article>
          ),
        )}

        <details className="card block" id="earlier">
          <summary>{earlier.summary}</summary>
          <div className="job" style={{ paddingTop: 0 }}>
            <p className="ctx">{earlier.context}</p>
            <Chips items={earlier.chips} />
          </div>
        </details>

        <div className="card nudge">
          <ExternalLink className="btn primary" link={{ label: labels.book, href: CAL_URL, external: true }} />
          <a className="u" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
