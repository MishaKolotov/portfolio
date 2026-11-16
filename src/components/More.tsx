import type { ReactNode } from 'react';

/** Native disclosure: works without JavaScript. */
export function More({ label, hidden, children }: { label: string; hidden?: string; children: ReactNode }) {
  return (
    <details>
      <summary>
        {label}
        {hidden ? <span className="vh"> {hidden}</span> : null}
      </summary>
      {children}
    </details>
  );
}
