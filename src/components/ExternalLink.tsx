import type { ReactNode } from 'react';
import type { Link } from '../content';

/** Renders a content link. External links open in a new tab and announce it. */
export function ExternalLink({
  link,
  className,
  arrow,
  children,
}: {
  link: Link;
  className?: string;
  /** Literal visible arrow (the mock's `.links` rows); `a.x` arrows come from CSS. */
  arrow?: boolean;
  children?: ReactNode;
}) {
  const label = children ?? link.label;
  if (!link.external) {
    return (
      <a className={className} href={link.href}>
        {label}
      </a>
    );
  }
  return (
    <a className={className} href={link.href} target="_blank" rel="noopener">
      {label}
      {arrow ? (
        <>
          {' '}
          <span aria-hidden="true">↗</span>
        </>
      ) : null}
      <span className="vh"> (opens in new tab)</span>
    </a>
  );
}
