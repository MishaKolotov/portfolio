'use client';

import { useEffect } from 'react';

/** Opens a collapsed <details> when the URL hash points at it. */
export function HashOpener() {
  useEffect(() => {
    const openTarget = () => {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t && t.tagName === 'DETAILS') (t as HTMLDetailsElement).open = true;
    };
    openTarget();
    addEventListener('hashchange', openTarget);
    return () => removeEventListener('hashchange', openTarget);
  }, []);
  return null;
}
