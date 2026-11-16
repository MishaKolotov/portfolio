import { sections, stack } from '../content';
import { More } from './More';
import { Chips } from './parts';

export function Stack() {
  return (
    <section id="stack">
      <div className="label">
        <h2>{sections.stack.heading}</h2>
        <small>{sections.stack.sub}</small>
      </div>
      <div className="card" style={{ padding: '8px 28px' }}>
        {stack.map((g) => (
          <div className="skill" key={g.name}>
            <h3>{g.name}</h3>
            {g.more || g.note ? (
            <div>
              <Chips items={g.core} />
              {g.more ? (
                <More label={`${g.more.length} more`} hidden={g.moreLabel}>
                  <Chips items={g.more} />
                </More>
              ) : null}
              {g.note ? (
                <p className="small" style={{ marginTop: 8 }}>
                  {g.note}
                </p>
              ) : null}
            </div>
            ) : (
              <Chips items={g.core} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
