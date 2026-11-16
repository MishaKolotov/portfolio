import { outside, sections } from '../content';
import { ExternalLink } from './ExternalLink';

export function Outside() {
  const [before, after] = outside.text.split('{studio}');
  return (
    <section>
      <div className="label">
        <h2>{sections.outside.heading}</h2>
        <small>{sections.outside.sub}</small>
      </div>
      <div className="body">
        <p>
          {before}
          <ExternalLink className="x" link={outside.studio} />
          {after}
        </p>
        <p className="small">{outside.line}</p>
      </div>
    </section>
  );
}
