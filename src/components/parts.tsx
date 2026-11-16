import { Fragment } from 'react';

/** Splits `**bold**` runs into <b>. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((c) => (
        <span className="chip" key={c}>
          {c}
        </span>
      ))}
    </div>
  );
}

export function Points({ items }: { items: string[] }) {
  return (
    <ul className="pts" role="list">
      {items.map((t) => (
        <li key={t}>
          <Rich text={t} />
        </li>
      ))}
    </ul>
  );
}
