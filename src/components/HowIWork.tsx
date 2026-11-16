import { howIWork, sections } from '../content';

export function HowIWork() {
  return (
    <section>
      <div className="label">
        <h2>{sections.howIWork.heading}</h2>
        <small>{sections.howIWork.sub}</small>
      </div>
      <div className="body">
        <p>{howIWork.intro}</p>
        <details className="card block rules">
          <summary>{howIWork.rulesLabel}</summary>
          <div className="frame" style={{ paddingTop: 0 }}>
            {howIWork.rules.map((r, i) => (
              <div className="row" key={r.title}>
                <div className="dot" aria-hidden="true">
                  {i + 1}
                </div>
                <div className="t">
                  <b>{r.title}</b>
                  <i>{r.text}</i>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
